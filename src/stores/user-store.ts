import { defineStore } from 'pinia';
import type { User } from '../models/User';
import { UserRecordType } from '../models/UserRecordType';

const STORAGE_KEY = 'user-manager-users';

// Пример данных пользователей
export const EXAMPLE_USERS: User[] = [
  {
    id: 1,
    labels: ['админ', 'основной'],
    login: 'admin',
    password: 'admin123',
    recordType: UserRecordType.Local
  },
  {
    id: 2,
    labels: ['пользователь', 'ldap'],
    login: 'ldap_user',
    recordType: UserRecordType.LDAP
  },
  {
    id: 3,
    labels: ['тест'],
    login: 'testuser',
    password: 'testpass',
    recordType: UserRecordType.Local
  },
  {
    id: 4,
    labels: ['гость'],
    login: 'guest',
    password: 'guest',
    recordType: UserRecordType.Local
  },
  {
    id: 5,
    labels: ['ldap', 'менеджер'],
    login: 'manager_ldap',
    recordType: UserRecordType.LDAP
  },
  {
    id: 6,
    labels: ['разработчик'],
    login: 'dev',
    password: 'devpass',
    recordType: UserRecordType.Local
  },
  {
    id: 7,
    labels: ['ldap', 'аналитик'],
    login: 'analyst_ldap',
    recordType: UserRecordType.LDAP
  },
  {
    id: 8,
    labels: ['локальный', 'оператор'],
    login: 'operator',
    password: 'operatorpass',
    recordType: UserRecordType.Local
  }
];

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
    },
    setUsers(users: User[]) {
      this.users = [...users];
      saveUsers(this.users);
    },
    setExampleUsers() {
        this.setUsers(EXAMPLE_USERS);
    }
  }
});