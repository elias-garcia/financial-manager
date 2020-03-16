import { MongoClient, Db, MongoClientOptions } from "mongodb";

export class DatabaseService {
  private mongoClientOptions: MongoClientOptions = {
    useUnifiedTopology: true
  };
  private client: MongoClient;
  private db: Db | undefined;

  constructor(databaseUri: string) {
    this.client = new MongoClient(databaseUri, this.mongoClientOptions);
  }

  async connect(databaseName: string): Promise<void> {
    await this.client.connect();
    this.db = this.client.db(databaseName);
  }

  getDb(): Db | undefined {
    return this.db;
  }
}
