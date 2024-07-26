import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  toAsyncIterableIterator,
  toIterableIterator,
} from '../../core';

/**
 * Creates iterator that skips first N elements of original iterable value
 *
 * @example
 *   from([1, 2, 3, 4, 5]).pipe(skip(2)); // [3, 4, 5]
 *
 * @param amount Number of elements to skip
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function skip(amount: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = toIterableIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      while (amount && !next.done) {
        next = iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Creates iterator that skips first N elements of original asynchronous iterable value
 *
 * @example
 *   new AsyncCollection([1, 2, 3, 4, 5]).pipe(skipAsync(2)); // [3, 4, 5]
 *
 * @param amount Number of elements to skip
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function skipAsync(amount: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = toAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && amount) {
        next = await iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
