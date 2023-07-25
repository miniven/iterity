import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Creates an asynchronous iterator that returns pairs of [index, value] for each element of the original collection
 *
 * @example
 *   new AsyncCollection(["bob", "mark", "ben"]).pipe(enumerableAsync); // Promise {[[0, "bob"], [1, "mark"], [2, "ben"]]}
 *
 * @param iterable Asynchronous iterable value
 * @returns Asynchronous iterable iterator
 */
export function enumerableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<[number, T]> {
  const iterator = getAsyncIterableIterator(iterable);

  let index = 0;
  let state = State.IDLE;

  return createAsyncIterableIterator(async function () {
    const { value, done } = await iterator.next();

    if (done || state === State.DONE) {
      state = State.DONE;

      return createIteratorReturn();
    }

    return createIteratorYield<[number, T]>([index++, value]);
  });
}

/**
 * Creates an iterator that returns pairs of [index, value] for each element of the original collection
 *
 * @example
 *   from(["bob", "mark", "ben"]).pipe(enumerable); // [[0, "bob"], [1, "mark"], [2, "ben"]]
 *
 * @param iterable Iterable value
 * @returns Iterable iterator
 */
export function enumerable<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  const iterator = getIterableIterator(iterable);

  let index = 0;
  let state = State.IDLE;

  return createIterableIterator(function () {
    const { value, done } = iterator.next();

    if (done || state === State.DONE) {
      state = State.DONE;

      return createIteratorReturn();
    }

    return createIteratorYield<[number, T]>([index++, value]);
  });
}
