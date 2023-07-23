/**
 * Returns the last element of the collection
 *
 * @example
 *   from([1, 2, 3]).collect(last); // 3
 *
 * @example
 *   last([1, 2, 3]); // 3
 *
 * @param iterable Iterable collection
 * @returns Last element of the collection
 */
export function last<T>(iterable: Iterable<T>): T | undefined {
  let result;

  for (const value of iterable) {
    result = value;
  }

  return result;
}

/**
 * Returns promise with either the last element of the asynchronous collection or undefined
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(lastAsync); // Promise {3}
 *
 * @example
 *   lastAsync(new AsyncCollection([1, 2, 3])); // Promise {3}
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with either the last element of the collection or undefined
 */
export async function lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
  let result;

  for await (const value of iterable) {
    result = value;
  }

  return result;
}
