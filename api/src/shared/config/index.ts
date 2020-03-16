import { ConfigService } from "./config.service";

export const configService: ConfigService = new ConfigService({
  API_PORT: process.env.API_PORT,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME
});
