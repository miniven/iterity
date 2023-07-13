/**
 * Находит максимальный элемент коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Максимальный элемент коллекции
 */
export function max(iterable: Iterable<number>): number {
  let max = -Infinity;

  for (const num of iterable) {
    if (num > max) {
      max = num;
    }
  }

  return max;
}
