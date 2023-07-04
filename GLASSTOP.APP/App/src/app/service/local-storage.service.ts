// local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
