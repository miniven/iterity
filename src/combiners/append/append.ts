import { sequence, sequenceAsync } from '../sequence';

/**
 * Creates iterator that combines the elements of the passed collections with the elements of the target iterable collection,
 * inserting the collections after the target collection.
 *
 * @example
 *   from([1, 2, 3]).pipe(append([4, 5], new Set([6, 7]))); // [1, 2, 3, 4, 5, 6, 7]
 *
 * @param iterables Iterable collections
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function append<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(iterable, additional, ...iterables);
  };
}

/**
 * Creates asynchronous iterator that combines the elements of the passed asynchronous collections
 * with the elements of the target asynchronous iterable collection, inserting the collections after the target collection.
 *
 * @example
 *   const nextAsyncCollection = new AsyncCollection([3, 4]);
 *   const collection = new AsyncCollection([1, 2]).pipe(
 *     appendAsync(nextAsyncCollection)
 *   ); // [1, 2, 3, 4]
 *
 * @param iterables Asynchronous iterable collections
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function appendAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T | R> {
    return sequenceAsync<T | R>(iterable, additional, ...iterables);
  };
}
