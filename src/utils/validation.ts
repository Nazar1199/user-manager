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