/**
 * Находит максимальный элемент коллекции чисел и возвращает его.
 *
 * @param iterable Перебираемая коллекция чисел
 * @returns Максимальный элемент коллекции
 */
export function max(iterable: Iterable<number>): number | undefined {
  let max;

  for (const num of iterable) {
    if (num > (max ?? -Infinity)) {
      max = num;
    }
  }

  return max;
}
