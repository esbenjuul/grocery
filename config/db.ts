import { MongoClient } from "npm:mongodb";

export class DatabaseConnection {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
    console.log("connected to MongoDB");
  }
  public async connect() {
    try {
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
const dbHostUrl = Deno.env.get("DB_URI") || "mongodb://localhost:27017";
const db = new DatabaseConnection(dbName, dbHostUrl);
await db.connect();
export { db };
