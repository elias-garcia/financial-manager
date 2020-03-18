import * as express from "express";
import { singleton } from "tsyringe";

import { DatabaseService } from "./shared/database/database.service";
import { ConfigService } from "./shared/config/config.service";
import { UsersRouter } from "./modules/users/users.router";
import { ExpressErrorHandler } from "./shared/error-handling/express.error-handler";

@singleton()
export class App {
  private readonly app: express.Express;

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly usersRouter: UsersRouter,
    private readonly expressErrorHandler: ExpressErrorHandler
  ) {
    this.app = express();
  }

  async bootstrap(callback: (port: number) => void): Promise<void> {
    await this.connectToDatabase();
    this.registerBeforeRoutesMiddleware();
    this.setupRoutes();
    this.registerErrorHandlers();
    this.run(callback);
  }

  private async connectToDatabase(): Promise<void> {
    await this.databaseService.connect(this.configService.getDbUri());
  }

  private registerBeforeRoutesMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use(this.usersRouter.getRootPath(), this.usersRouter.getRouter());
  }

  private registerErrorHandlers(): void {
    this.app.use(this.expressErrorHandler.routeNotFoundErrorHandler);
    this.app.use(this.expressErrorHandler.globalErrorHandler);
  }

  private run(callback: (port: number) => void): void {
    const port: number = this.configService.getPort();
    this.app.listen(port, () => callback(port));
  }
}
