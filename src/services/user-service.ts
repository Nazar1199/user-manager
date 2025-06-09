import type { User } from '../models/User';
import { userValidationRules } from '../utils/validation';
import { UserRecordType } from '../models/UserRecordType';

export class UserService {
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

  static parseLabels(input: string): { text: string }[] {
    return input
      .split(';')
      .map(s => s.trim())
      .filter(Boolean)
      .map(text => ({ text }));
  }

  static labelsToString(labels: { text: string }[]): string {
    return labels.map(l => l.text).join('; ');
  }
}
