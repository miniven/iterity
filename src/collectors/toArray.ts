/**
 * Собирает все элементы коллекции в массив и возвращает его
 *
 * @param iterable Перебираемая коллекция
 * @returns Массив
 */
export function toArray<T>(iterable: Iterable<T>): Array<T> {
  return [...iterable];
}
