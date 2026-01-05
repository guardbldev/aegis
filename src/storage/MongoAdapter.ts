/****************************************************************
* MongoAdapter.ts
*
* Storage Adapter for MongoDB.
* Suited for distributed bots and high-availability.
****************************************************************/
import { StorageAdapter } from "./Adapter";
import { MongoClient, Db, Collection } from "mongodb";

export class MongoAdapter implements StorageAdapter {
  private uri: string;
  private dbName: string;
  private collectionName: string;
  private client: MongoClient;
  private db: Db;
  private col: Collection;

  constructor(
    uri: string,
    dbName = "aegis",
    collectionName = "permissions"
  ) {
    this.uri = uri;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  private async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.col = this.db.collection(this.collectionName);
    }
  }

  async get(key: string) {
    await this.connect();
    const doc = await this.col.findOne({ key });
    return doc?.value;
  }

  async set(key: string, value: any) {
    await this.connect();
    await this.col.updateOne(
      { key },
      { $set: { key, value } },
      { upsert: true }
    );
  }

  async delete(key: string) {
    await this.connect();
    await this.col.deleteOne({ key });
  }

  async all() {
    await this.connect();
    const docs = await this.col.find().toArray();
    return Object.fromEntries(docs.map(doc => [doc.key, doc.value]));
  }
}