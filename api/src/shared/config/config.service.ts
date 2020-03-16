import { Config } from "./config.interface";
import { configSchema } from "./config.schema";

export class ConfigService {
  private config: Config;

  constructor(config: {}) {
    // tslint:disable-next-line: no-console
    console.log(config);
    // tslint:disable-next-line: no-console
    console.log(process.env);
    this.config = this.validateConfig(config);
  }

  private validateConfig(config: {}): Config {
    return configSchema.validateSync(config);
  }

  getPort(): Config["API_PORT"] {
    return this.config.API_PORT;
  }

  getDbUri(): Config["DB_URI"] {
    return this.config.DB_URI;
  }

  getDbName(): Config["DB_NAME"] {
    return this.config.DB_NAME;
  }
}
