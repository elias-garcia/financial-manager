import { singleton } from "tsyringe";

import { Config } from "./config.interface";
import { configValidationSchema } from "./config.validation-schema";

@singleton()
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = this.validateConfig({
      API_PORT: process.env.API_PORT,
      DB_URI: process.env.DB_URI,
      DB_NAME: process.env.DB_NAME
    });
  }

  private validateConfig(config: {}): Config {
    return configValidationSchema.validateSync(config);
  }

  getPort(): Config["API_PORT"] {
    return this.config.API_PORT;
  }

  getDbUri(): Config["DB_URI"] {
    return this.config.DB_URI;
  }
}
