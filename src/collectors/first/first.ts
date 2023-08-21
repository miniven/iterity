import { getAsyncIterator, getIterator } from '../../core';

/**
 * Returns the first element of the collection
 *
 * @example
 *   from([1, 2, 3]).collect(first); // 1
 *
 * @example
 *   first([1, 2, 3]); // 1
 *
 * @param iterable Iterable collection
 * @returns First element of the collection
 */
export function first<T>(iterable: Iterable<T>): T | undefined {
  const iterator = getIterator(iterable);

  return iterator.next().value;
}

/**
 * Returns promise with either the first element of the asynchronous collection or undefined
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(firstAsync); // Promise {1}
 *
 * @example
 *   firstAsync(new AsyncCollection([1, 2, 3])); // Promise {1}
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with either the first element of the collection or undefined
 */
export async function firstAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
  const iterator = getAsyncIterator(iterable);
  const next = await iterator.next();

  return next.value;
}
