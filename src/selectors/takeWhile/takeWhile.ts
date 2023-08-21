import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Creates iterator that yields first elements of the original iterable value while predicate returns true
 *
 * @example
 *   from([1, 2, 3, 4, 5]).pipe(takeWhile((value) => value < 3)); // [1, 2]
 *
 * @example
 *   from([100, 1, 2, 3, 4]).pipe(takeWhile((value) => value < 3)); // []
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function takeWhile<T>(predicate: (value: T) => boolean) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let state = State.IDLE;

    return createIterableIterator(function () {
      const next = iterator.next();

      if (next.done || !predicate(next.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Creates asynchronous iterator that yields first elements of the original iterable value while predicate returns true
 *
 * @example
 *   new AsyncCollection([1, 2, 3, 4, 5]).pipe(takeWhileAsync((value) => value < 3)); // Promise {[1, 2]}
 *
 * @example
 *   new AsyncCollection([100, 1, 2, 3, 4]).pipe(takeWhileAsync((value) => value < 3)); // Promise {[]}
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function takeWhileAsync<T>(predicate: (value: T) => boolean) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let state = State.IDLE;

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();
      const result = await next;

      if (result.done || !predicate(result.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}
