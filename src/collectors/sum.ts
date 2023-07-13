/**
 * Вычисляет сумму всех элементов коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Сумма всех элементов коллекции
 */
export function sum(iterable: Iterable<number>): number {
  let result = 0;

  for (const num of iterable) {
    result += num;
  }

  return result;
}
