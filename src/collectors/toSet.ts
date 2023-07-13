/**
 * Собирает все элементы коллекции в Set и возвращает его
 *
 * @param iterable Перебираемая коллекция
 * @returns Set
 */
export function toSet<T>(iterable: Iterable<T>): Set<T> {
  return new Set(iterable);
}
