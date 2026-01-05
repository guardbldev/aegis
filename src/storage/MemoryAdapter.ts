/****************************************************************
* MemoryAdapter.ts
*
* Fast, in-memory ephemeral storage adapter.
****************************************************************/
import { StorageAdapter } from "./Adapter";

export class MemoryAdapter implements StorageAdapter {
  private store: {[key: string]: any} = {};
  
  async get(key: string) {
    return this.store[key];
  }
  async set(key: string, value: any) {
    this.store[key] = value;
  }
  async delete(key: string) {
    delete this.store[key];
  }
  async all() {
    return {...this.store};
  }
}