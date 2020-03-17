import * as mongoose from "mongoose";
import { singleton } from "tsyringe";

@singleton()
export class DatabaseService {
  private readonly connectionOptions: mongoose.ConnectionOptions = {
    useUnifiedTopology: true
  };

  async connect(databaseUri: string): Promise<void> {
    await mongoose.connect(databaseUri, this.connectionOptions);
  }
}
