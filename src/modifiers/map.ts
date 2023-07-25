import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Calls passed callback function on each element of collection, and returns iterable that contains the results
 *
 * @example
 *   from([1, 2]).pipe(map((value) => value + 100)); // [101, 102]
 *
 * @param mapper Function to map original value to another value. Accepts current value and iterable collection.
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function map<T, R>(mapper: (value: T, iterable: Iterable<T>) => R) {
  return function (iterable: Iterable<T>): IterableIterator<R> {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      if (next.done) {
        return next;
      }

      return createIteratorYield(mapper(next.value, iterable));
    });
  };
}

/**
 * Calls passed callback function on each element of asynchronous collection,
 * and returns asynchronous iterable that contains the results
 *
 * @example
 *   new AsyncCollection([1, 2]).pipe(mapAsync((value) => value + 100)); // Promise {[101, 102]}
 *
 * @param mapper Function to map original value to another value. Accepts current value and iterable collection.
 * @returns Function which accepts the target collection and creates new asyncronous iterable iterator
 */
export function mapAsync<T, R>(mapper: (value: T, iterable: AsyncIterable<T>) => R) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<R> {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = await iterator.next();

      if (next.done) {
        return next;
      }

      return createIteratorYield(mapper(next.value, iterable));
    });
  };
}
