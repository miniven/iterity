import { sequence, sequenceAsync } from './sequence';

/**
 * Creates iterator that combines the elements of the passed collections with the elements of the target iterable collection,
 * inserting the collections before the target collection.
 *
 * @example
 *   from([1, 2, 3]).pipe(prepend([-1, 0])); // [-1, 0, 1, 2]
 *
 * @param iterables Iterable collections
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function prepend<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(additional, ...iterables, iterable);
  };
}

/**
 * Creates asynchronous iterator that combines the elements of the passed asynchronous collections
 * with the elements of the target asynchronous iterable collection, inserting the collections before the target collection.
 *
 * @example
 *   const prevAsyncCollection = new AsyncCollection([-1, 0]);
 *   const collection = new AsyncCollection([1, 2]).pipe(
 *     prependAsync(prevAsyncCollection)
 *   ); // [-1, 0, 1, 2]
 *
 * @param iterables Asynchronous iterable collections
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function prependAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T | R> {
    return sequenceAsync<T | R>(additional, ...iterables, iterable);
  };
}
