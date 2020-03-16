import { DatabaseService } from "./database.service";
import { configService } from "../config";

export const databaseClientService: DatabaseService = new DatabaseService(
  configService.getDbUri()
);
