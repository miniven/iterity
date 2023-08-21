/**
 * Calculates the sum of all elements of the numeric collection and returns it
 *
 * @example
 *   from([1, 2, 3]).collect(sum);
 *
 * @example
 *   sum([1, 2, 3]);
 *
 * @param iterable Numeric iterable collection
 * @returns Sum of all elements
 */
export function sum(iterable: Iterable<number>): number {
  let result = 0;

  for (const num of iterable) {
    result += num;
  }

  return result;
}

/**
 * Calculates the sum of all elements of the asynchronous numeric collection and returns promise with it
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(sumAsync);
 *
 * @example
 *   sumAsync(new AsyncCollection([1, 2, 3]));
 *
 * @param iterable Asynchronous numeric iterable collection
 * @returns Promise with sum of all elements
 */
export async function sumAsync(iterable: AsyncIterable<number>): Promise<number> {
  let result = 0;

  for await (const num of iterable) {
    result += num;
  }

  return result;
}
