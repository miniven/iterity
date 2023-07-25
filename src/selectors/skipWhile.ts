import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  SKIPPED = 'SKIPPED',
}

/**
 * Creates iterator that skips first elements of the original iterable value while predicate returns true
 *
 * @example
 *   from([1, 2, 3, 4, 5]).pipe(skipWhile((value) => value < 3)); // [3, 4, 5]
 *
 * @example
 *   from([100, 1, 2, 3, 4]).pipe(skipWhile((value) => value < 3)); // [100, 1, 2, 3, 4]
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function skipWhile<T>(predicate: (value: T) => boolean) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let state = State.IDLE;

    return createIterableIterator(function () {
      let next = iterator.next();

      while (predicate(next.value) && state === State.IDLE) {
        next = iterator.next();
      }

      state = State.SKIPPED;

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Creates asynchronous iterator that skips first elements of the original iterable value while predicate returns true
 *
 * @example
 *   new AsyncCollection([1, 2, 3, 4, 5]).pipe(skipWhileAsync((value) => value < 3)); // Promise {[3, 4, 5]}
 *
 * @example
 *   new AsyncCollection([100, 1, 2, 3, 4]).pipe(skipWhileAsync((value) => value < 3)); // Promise {[100, 1, 2, 3, 4]}
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function skipWhileAsync<T>(predicate: (value: T) => boolean) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let state = State.IDLE;

    return createAsyncIterableIterator(async function () {
      let next = iterator.next();
      const result = await next;

      while (predicate(result.value) && state === State.IDLE) {
        next = iterator.next();
      }

      state = State.SKIPPED;

      if (result.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
