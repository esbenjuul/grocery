import { MongoClient } from "mongodb";

export class DatabaseConnection {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  public async connect() {
    try {
      console.log("connecting to MongoDB");
      const client = new MongoClient(this.url);
      await client.connect();
      this.client = client;
    } catch (err) {
      console.error(err);
    }
  }
  public getDatabase() {
    return this.client.db(this.dbName);
  }
}

const dbName = Deno.env.get("DB_NAME") || "grocery";
const dbHostUrl = Deno.env.get("DB_URI") || "mongodb://127.0.0.1:27017";
const db = new DatabaseConnection(dbName, dbHostUrl);
await db.connect();
export { db };
