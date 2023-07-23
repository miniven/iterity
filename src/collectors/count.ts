/**
 * Counts the number of elements in the collection and returns it
 *
 * @example
 *   from([1, 2, 3]).collect(count);
 *
 * @example
 *   count([1, 2, 3]);
 *
 * @param iterable Iterable collection
 * @returns Number of elements
 */
export function count<T>(iterable: Iterable<T>): number {
  let counter = 0;

  for (const _ of iterable) {
    counter++;
  }

  return counter;
}

/**
 * Counts the number of elements in the collection and returns promise with it
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(countAsync);
 *
 * @example
 *   countAsync(new AsyncCollection([1, 2, 3]));
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with number of elements
 */
export async function countAsync<T>(iterable: Iterable<T>): Promise<number> {
  let counter = 0;

  for await (const _ of iterable) {
    counter++;
  }

  return counter;
}
