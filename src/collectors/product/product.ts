/**
 * Calculates the product of all elements of the numeric collection and returns it
 *
 * @example
 *   from([1, 2, 3]).collect(product);
 *
 * @example
 *   product([1, 2, 3]);
 *
 * @param iterable Numeric iterable collection
 * @returns Product of all elements
 */
export function product(iterable: Iterable<number>): number {
  let result;

  for (const num of iterable) {
    result = num * (result ?? 1);
  }

  return result ?? 0;
}

/**
 * Calculates the product of all elements of the asynchronous numeric collection and returns promise with it
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(productAsync);
 *
 * @example
 *   productAsync(new AsyncCollection([1, 2, 3]));
 *
 * @param iterable Asynchronous numeric iterable collection
 * @returns Promise with product of all elements
 */
export async function productAsync(iterable: AsyncIterable<number>): Promise<number> {
  let result;

  for await (const num of iterable) {
    result = num * (result ?? 1);
  }

  return result ?? 0;
}
