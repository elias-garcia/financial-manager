import { Config } from "./config.interface";
import { configSchema } from "./config.schema";

class ConfigService {
  private config: Config;

  constructor(config: { [key: string]: string | number | undefined }) {
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
}
