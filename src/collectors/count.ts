/**
 * Считает количество элементов коллекции и возвращает их число
 *
 * @param iterable Перебираемая коллекция
 * @returns Количество элементов в коллекции
 */
export function count<T>(iterable: Iterable<T>): number {
  let counter = 0;

  for (const _ of iterable) {
    counter++;
  }

  return counter;
}
