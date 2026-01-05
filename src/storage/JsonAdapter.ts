/****************************************************************
* JsonAdapter.ts
*
* File-backed storage for persistent configs, audit logs.
****************************************************************/
import { StorageAdapter } from "./Adapter";
import fs from "fs/promises";

export class JsonAdapter implements StorageAdapter {
  private filePath: string;
  private cache: {[key: string]: any} = {};

  constructor(filePath: string) {
    this.filePath = filePath;
    this.load();
  }

  private async load() {
    try {
      const raw = await fs.readFile(this.filePath, "utf-8");
      this.cache = JSON.parse(raw);
    } catch (e) {
      this.cache = {};
    }
  }

  private async save() {
    await fs.writeFile(this.filePath, JSON.stringify(this.cache, null, 2));
  }

  async get(key: string) {
    await this.load();
    return this.cache[key];
  }
  async set(key: string, value: any) {
    this.cache[key] = value;
    await this.save();
  }
  async delete(key: string) {
    delete this.cache[key];
    await this.save();
  }
  async all() {
    await this.load();
    return { ...this.cache };
  }
}