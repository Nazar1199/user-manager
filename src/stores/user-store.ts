import { defineStore } from 'pinia';
import type { User } from '../models/User';

const STORAGE_KEY = 'user-manager-users';

function loadUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: loadUsers(),
  }),

  actions: {
    addUser(user: User) {
      this.users.push(user);
      saveUsers(this.users);
    },
    removeUser(id: number) {
      this.users = this.users.filter(u => u.id !== id);
      saveUsers(this.users);
    },
    updateUser(updatedUser: User) {
      const idx = this.users.findIndex(u => u.id === updatedUser.id);
      if (idx !== -1) {
        this.users[idx] = { ...updatedUser };
        saveUsers(this.users);
      }
    },
    loadFromStorage() {
      this.users = loadUsers();
    },
    saveToStorage() {
      saveUsers(this.users);
    }
  }
});