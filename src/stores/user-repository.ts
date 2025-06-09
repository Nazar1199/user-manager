import type { User } from '../models/User';

export interface UserRepository {
  load(): User[];
  save(users: User[]): void;
}

export class LocalStorageUserRepository implements UserRepository {
  private readonly STORAGE_KEY = 'user-manager-users';

  load(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  save(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }
}
