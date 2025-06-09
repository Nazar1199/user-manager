import type { User } from '../models/User';
import { userValidationRules } from '../utils/validation';
import { UserRecordType } from '../models/UserRecordType';

/**
 * UserService — сервис для бизнес-логики, связанной с пользователями.
 * Содержит методы для валидации пользователя и работы с метками.
 */
export class UserService {
  /**
   * Проверяет валидность пользователя по всем правилам.
   * @param user Пользователь для проверки
   * @returns Массив строк с названиями невалидных полей (например, ['login', 'password'])
   */
  static validateUser(user: User): string[] {
    const errors: string[] = [];
    // Validate login
    if (userValidationRules.login.some(rule => rule(user.login) !== true)) {
      errors.push('login');
    }
    // Validate password if Local
    if (
      user.recordType === UserRecordType.Local &&
      userValidationRules.password(true).some(rule => rule(user.password || '') !== true)
    ) {
      errors.push('password');
    }
    // Validate labels
    if (userValidationRules.labels.some(rule => rule(user.labels.map(l => l.text).join('; ')) !== true)) {
      errors.push('labels');
    }
    return errors;
  }

  /**
   * Преобразует строку меток в массив объектов { text: string }
   * @param input Строка меток, разделённых точкой с запятой
   * @returns Массив меток
   */
  static parseLabels(input: string): { text: string }[] {
    return input
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .map(text => ({ text }));
  }

  /**
   * Преобразует массив меток в строку, разделённую точкой с запятой
   * @param labels Массив меток
   * @returns Строка меток
   */
  static labelsToString(labels: { text: string }[]): string {
    return labels.map(l => l.text).join('; ');
  }
}
