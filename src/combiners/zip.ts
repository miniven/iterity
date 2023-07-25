import { createIterableIterator, createIteratorReturn, createIteratorYield, getIterator } from '../core';

/**
 * Creates an iterator over tuples of elements of the passed collections
 *
 * @example
 *   zip([1, 2, 3], ["one", "two"]); // [[1, "one"], [2, "two"], [3, null]]
 *
 * @params iterables Iterable collections
 * @returns Iterable Iterator
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
