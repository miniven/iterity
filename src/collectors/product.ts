/**
 * Вычисляет произведение всех элементов коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Произведение всех элементов коллекции
 */
export function product(iterable: Iterable<number>): number {
  let result = 0;

  for (const num of iterable) {
    result *= num;
  }

  return result;
}
