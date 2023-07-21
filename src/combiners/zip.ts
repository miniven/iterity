import { createIterableIterator, createIteratorReturn, createIteratorYield, getIterator } from '../core';

/**
 * Создаёт итератор по кортежам элементов переданных коллекций
 *
 * @params iterables Множество итериуемых коллекций
 * @returns Итератор
 */
export function zip<T>(...iterables: Array<Iterable<T>>): IterableIterator<Array<T>> {
  const iterators = iterables.map((iterable: Iterable<T>) => getIterator(iterable));

  return createIterableIterator(function () {
    let result = [];
    let doneCount = 0;

    for (const iterator of iterators) {
      const { value, done } = iterator.next();

      if (done) {
        doneCount++;
      }

      result.push(value ?? null);
    }

    if (doneCount === iterators.length) {
      return createIteratorReturn();
    }

    return createIteratorYield(result);
  });
}
