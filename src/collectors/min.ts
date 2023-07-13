/**
 * Находит минимальный элемент коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Минимальный элемент коллекции
 */
export function min(iterable: Iterable<number>): number {
  let min = Infinity;

  for (const num of iterable) {
    if (num < min) {
      min = num;
    }
  }

  return min;
}
