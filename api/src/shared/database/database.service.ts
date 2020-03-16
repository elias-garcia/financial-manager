import * as mongoose from "mongoose";

export class DatabaseService {
  private connectionOptions: mongoose.ConnectionOptions = {
    useUnifiedTopology: true
  };

  async connect(databaseUri: string): Promise<void> {
    await mongoose.connect(databaseUri, this.connectionOptions);
  }
}
