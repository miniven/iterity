/**
 * Returns new array with elements of the original iterable collection
 *
 * @example
 *   from(new Set([1, 2, 3])).collect(toArray); // [1, 2, 3]
 *
 * @example
 *   toArray(new Set([1, 2, 3])); // [1, 2, 3]
 *
 * @param iterable Iterable collection
 * @returns Array
 */
export function toArray<T>(iterable: Iterable<T>): Array<T> {
  return [...iterable];
}

/**
 * Returns promise of new array with values of elements of the original asynchronous iterable collection
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(toArrayAsync); // Promise {[1, 2, 3]}
 *
 * @example
 *   toArrayAsync(new AsyncCollection([1, 2, 3])); // Promise {[1, 2, 3]}
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with array
 */
export async function toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<Array<T>> {
  const result = [];

  for await (const value of iterable) {
    result.push(value);
  }

  return result;
}
