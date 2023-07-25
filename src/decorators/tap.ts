import {
  createAsyncIterableIterator,
  createIterableIterator,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Creates iterator that yields the same elements as the original collection,
 * but also calls passed callback (effect) for each element
 *
 * @example
 *   from(["start", "process", "finish"]).pipe(tap((step) => sendEvent(step)));
 *
 * @param effect Callback function to be called for each element
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      if (!next.done) {
        effect(next.value);
      }

      return next;
    });
  };
}

/**
 * Creates asynchronous iterator that yields the same elements as the original collection,
 * but also calls passed callback (effect) for each element
 *
 * @example
 *   new AsyncCollection(["start", "process", "finish"]).pipe(tapAsync((step) => sendEvent(step)));
 *
 * @param effect Callback function to be called for each element
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function tapAsync<T>(effect: (value: T) => void) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = await iterator.next();

      if (!next.done) {
        effect(next.value);
      }

      return next;
    });
  };
}
