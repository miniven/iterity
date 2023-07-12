import { getIterator } from '../core';

/**
 * Находит первый элемент коллекции и возвращает его
 *
 * @param iterable Перебираемая коллекция
 * @returns Первый элемент коллекции
 */
export function first<T>(iterable: Iterable<T>): T | undefined {
  const iterator = getIterator(iterable);

  return iterator.next().value;
}
