import { createAsyncIterableIterator, createIterableIterator, getAsyncIterableIterator, getIterator } from '../../core';

/**
 * Creates iterator for elements of the original iterable value,
 * that meet the condition specified in a predicate function
 *
 * @example
 *   from(["name", 4, "lastname", 7]).pipe(filter((value) => typeof value === "string")); // ["name", "lastname"]
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function filter<T>(predicate: (value: T) => boolean) {
  return function (iterable: Iterable<T>): IterableIterator<T> {
    const iterator = getIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      if (next.done) {
        return next;
      }

      while (!next.done && !predicate(next.value)) {
        next = iterator.next();
      }

      return next;
    });
  };
}

/**
 * Creates iterator for elements of the original asynchronous iterable value,
 * that meet the condition specified in a predicate function
 *
 * @example
 *   new AsyncCollection(["name", 4, "lastname", 7])
 *     .pipe(filterAsync((value) => typeof value === "string")); // Promise {["name", "lastname"]}
 *
 * @param predicate Predicate function
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function filterAsync<T>(predicate: (value: T) => boolean) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      if (next.done) {
        return next;
      }

      while (!next.done && !predicate(next.value)) {
        next = await iterator.next();
      }

      return next;
    });
  };
}
