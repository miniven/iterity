import { createIterableIterator, createIteratorReturn, getIterator } from '../core';

/**
 * Creates iterator that repeats the original collection a specified number of times. By default, it is infinite.
 *
 * @example
 *   from([1, 2, 3]).pipe(repeat(2)); // [1, 2, 3, 1, 2, 3]
 *
 * @param times Number of repeats
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function repeat<T>(times: number = Infinity) {
  return function (iterable: Iterable<T>): IterableIterator<T> {
    let iterator = getIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      if (next.done) {
        iterator = getIterator(iterable);
        next = iterator.next();
        times--;
      }

      if (times === 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
