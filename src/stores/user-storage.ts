import type { User } from '../models/User';

const STORAGE_KEY = 'user-manager-users';

export interface UserStorage {
  load(): User[];
  save(users: User[]): void;
}

export class LocalStorageUserStorage implements UserStorage {
  load(): User[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  save(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
}