import { defineStore } from 'pinia';
import type { User } from '../models/User';
import { LocalStorageUserStorage } from './user-storage';
import { EXAMPLE_USERS } from './example-users';

export interface UserLabel {
    text: string;
}

const userStorage = new LocalStorageUserStorage();

export const useUserStore = defineStore('user', {
  state: () => ({
    users: userStorage.load(),
  }),

  actions: {
    addUser(user: User) {
      this.users.push(user);
      userStorage.save(this.users);
    },
    removeUser(id: number) {
      this.users = this.users.filter(u => u.id !== id);
      userStorage.save(this.users);
    },
    updateUser(updatedUser: User) {
      const idx = this.users.findIndex(u => u.id === updatedUser.id);
      if (idx !== -1) {
        this.users[idx] = { ...updatedUser };
        userStorage.save(this.users);
      }
    },
    loadFromStorage() {
      this.users = userStorage.load();
    },
    saveToStorage() {
      userStorage.save(this.users);
    },
    setUsers(users: User[]) {
      this.users = [...users];
      userStorage.save(this.users);
    },
    setExampleUsers() {
      this.setUsers(EXAMPLE_USERS);
    }
  }
});