import { defineStore } from 'pinia';
import type { User } from '../models/User';
import { LocalStorageUserRepository, type UserRepository } from './user-repository';
import { EXAMPLE_USERS } from './example-users';

export interface UserLabel {
    text: string;
}

const userRepository: UserRepository = new LocalStorageUserRepository();

export const useUserStore = defineStore('user', {
  state: () => ({
    users: userRepository.load(),
  }),

  actions: {
    addUser(user: User) {
      this.users.push(user);
      userRepository.save(this.users);
    },
    removeUser(id: number) {
      this.users = this.users.filter(u => u.id !== id);
      userRepository.save(this.users);
    },
    updateUser(updatedUser: User) {
      const idx = this.users.findIndex(u => u.id === updatedUser.id);
      if (idx !== -1) {
        this.users[idx] = { ...updatedUser };
        userRepository.save(this.users);
      }
    },
    loadFromStorage() {
      this.users = userRepository.load();
    },
    saveToStorage() {
      userRepository.save(this.users);
    },
    setUsers(users: User[]) {
      this.users = [...users];
      userRepository.save(this.users);
    },
    setExampleUsers() {
      this.setUsers(EXAMPLE_USERS);
    }
  }
});