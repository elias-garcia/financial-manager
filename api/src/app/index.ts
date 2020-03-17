import * as express from "express";
import { singleton } from "tsyringe";

import { DatabaseService } from "./shared/database/database.service";
import { ConfigService } from "./shared/config/config.service";

@singleton()
export class App {
  private app: express.Express;

  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService
  ) {
    this.app = express();
  }

  async bootstrap(callback: (port: number) => void): Promise<void> {
    await this.connectToDatabase();
    this.run(callback);
  }

  private async connectToDatabase(): Promise<void> {
    await this.databaseService.connect(this.configService.getDbUri());
  }

  private run(callback: (port: number) => void): void {
    const port: number = this.configService.getPort();
    this.app.listen(port, () => callback(port));
  }
}
