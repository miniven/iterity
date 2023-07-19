/**
 * Находит минимальный элемент коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Минимальный элемент коллекции
 */
export function min(iterable: Iterable<number>): number | undefined {
  let min;

  for (const num of iterable) {
    if (num < (min ?? Infinity)) {
      min = num;
    }
  }

  return min;
}
