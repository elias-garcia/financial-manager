import { singleton } from "tsyringe";

import { Config } from "./config.interface";
import { configValidationSchema } from "./config.validation-schema";
import { ValidationService } from "../validation/validation.service";

@singleton()
export class ConfigService {
  private readonly config: Config;

  constructor(private readonly validationService: ValidationService) {
    this.config = this.validateConfig({
      API_PORT: process.env.API_PORT,
      DB_URI: process.env.DB_URI,
      DB_NAME: process.env.DB_NAME
    });
  }

  private validateConfig(config: {}): Config {
    return this.validationService.validate<Config>(
      config,
      configValidationSchema
    );
  }

  getPort(): Config["API_PORT"] {
    return this.config.API_PORT;
  }

  getDbUri(): Config["DB_URI"] {
    return this.config.DB_URI;
  }
}
