export interface ValidationOptions {
  required?: boolean;
  max?: number;
}

/**
 * Универсальная функция валидации поля.
 * @param value - Значение поля
 * @param options - Опции валидации
 * @returns true если валидно, иначе строка с ошибкой
 */
export function validateField(
  value: string,
  { required = false, max = 100 }: ValidationOptions = {}
): true | string {
  if (required && (!value || value.trim() === '')) {
    return 'Обязательное';
  }
  if (value && value.length > max) {
    return `Максимум ${max} символов`;
  }
  return true;
}

/**
 * Правила валидации для полей пользователя
 */
export const userValidationRules = {
  labels: [
    (val: string) => validateField(val, { required: false, max: 50 })
  ],
  login: [
    (val: string) => validateField(val, { required: true, max: 100 })
  ],
  password: (isRequired: boolean) => [
    (val: string) => validateField(val, { required: isRequired, max: 100 })
  ]
};