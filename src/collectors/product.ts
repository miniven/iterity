/**
 * Вычисляет произведение всех элементов коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Произведение всех элементов коллекции
 */
export function product(iterable: Iterable<number>): number {
  let result;

  for (const num of iterable) {
    result = num * (result ?? 1);
  }

  return result ?? 0;
}
