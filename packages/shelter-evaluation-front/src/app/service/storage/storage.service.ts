import { Injectable } from '@angular/core';
import { StorageOptions } from './storage.options';

@Injectable()
export class StorageService {
  save(key: string, data: any, options = new StorageOptions()) {
    const storage = this.getStorage(options);
    storage.setItem(key, data);
  }

  get(key: string, options = new StorageOptions()) {
    const storage = this.getStorage(options);
    return storage.getItem(key);
  }

  remove(key: string, options = new StorageOptions()) {
    const storage = this.getStorage(options);
    storage.removeItem(key);
  }

  private getStorage(options: StorageOptions) {
    if (options.persistant) {
      return localStorage;
    } else {
      return sessionStorage;
    }
  }
}
