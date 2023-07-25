import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core/helpers';

/**
 * Creates iterator that yields only first N elements of the original iterable value
 *
 * @example
 *   from([1, 2, 3, 4]).pipe(take(2)); // [1, 2]
 *
 * @param limit Number of yields
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function take(limit: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      limit--;

      if (next.done || limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Creates asyncronous iterator that yields only first N elements of the original iterable value
 *
 * @example
 *   new AsyncCollection([1, 2, 3, 4]).pipe(takeAsync(2)); // Promise {[1, 2]}
 *
 * @param limit Number of yields
 * @returns Function which accepts the target collection and creates new asyncronous iterable iterator
 */
export function takeAsync(limit: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();

      limit--;

      if (limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
