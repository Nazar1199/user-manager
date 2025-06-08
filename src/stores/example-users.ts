import { UserRecordType } from '../models/UserRecordType';
import type { User } from '../models/User';

export const EXAMPLE_USERS: User[] = [
  {
    id: 1,
    labels: [{ text: 'админ' }, { text: 'основной' }],
    login: 'admin',
    password: 'admin123',
    recordType: UserRecordType.Local
  },
  {
    id: 2,
    labels: [{ text: 'пользователь' }, { text: 'ldap' }],
    login: 'ldap_user',
    recordType: UserRecordType.LDAP
  },
  {
    id: 3,
    labels: [{ text: 'тест' }],
    login: 'testuser',
    password: 'testpass',
    recordType: UserRecordType.Local
  },
  {
    id: 4,
    labels: [{ text: 'гость' }],
    login: 'guest',
    password: 'guest',
    recordType: UserRecordType.Local
  },
  {
    id: 5,
    labels: [{ text: 'ldap' }, { text: 'менеджер' }],
    login: 'manager_ldap',
    recordType: UserRecordType.LDAP
  },
  {
    id: 6,
    labels: [{ text: 'разработчик' }],
    login: 'dev',
    password: 'devpass',
    recordType: UserRecordType.Local
  },
  {
    id: 7,
    labels: [{ text: 'ldap' }, { text: 'аналитик' }],
    login: 'analyst_ldap',
    recordType: UserRecordType.LDAP
  },
  {
    id: 8,
    labels: [{ text: 'локальный' }, { text: 'оператор' }],
    login: 'operator',
    password: 'operatorpass',
    recordType: UserRecordType.Local
  }
];