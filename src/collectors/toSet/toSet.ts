/**
 * Returns new Set with elements of the original iterable collection
 *
 * @example
 *   from([1, 2, 3]).collect(toSet); // Set {1, 2, 3}
 *
 * @example
 *   toSet([1, 2, 3]); // Set {1, 2, 3}
 *
 * @param iterable Iterable collection
 * @returns Set
 */
export function toSet<T>(iterable: Iterable<T>): Set<T> {
  return new Set(iterable);
}

/**
 * Returns promise of new Set with values of elements of the original asynchronous iterable collection
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(toSetAsync); // Promise {Set {1, 2, 3}}
 *
 * @example
 *   toSetAsync(new AsyncCollection([1, 2, 3])); // Promise {Set {1, 2, 3}}
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with Set
 */
export async function toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>> {
  const result = new Set<T>();

  for await (const value of iterable) {
    result.add(value);
  }

  return result;
}
