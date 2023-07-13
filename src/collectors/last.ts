/**
 * Находит последний элемент коллекции и возвращает его
 *
 * @param iterable Перебираемая коллекция
 * @returns Последний элемент коллекции
 */
export function last<T>(iterable: Iterable<T>): T | undefined {
  let result;

  for (const value of iterable) {
    result = value;
  }

  return result;
}
