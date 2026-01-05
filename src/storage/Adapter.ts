/****************************************************************
* Adapter.ts
*
* Abstract interface for storage backends.
* Used for hot-reload configs, logging, audit, etc.
****************************************************************/
export interface StorageAdapter {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
  all(): Promise<{[key: string]: any}>;
}