import * as express from "express";

import { databaseClientService } from "./shared/database";
import { configService } from "./shared/config";

async function bootstrap(): Promise<void> {
  const app: express.Express = express();
  const port: number = configService.getPort();

  await databaseClientService.connect(configService.getDbUri());

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`API listening on port ${port}`);
  });
}

bootstrap();
