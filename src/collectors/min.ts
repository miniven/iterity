/**
 * Finds the minimum element of the numeric iterable collection and returns it
 *
 * @example
 *   from([1, -100, 2]).collect(min); // -100
 *
 * @example
 *   min([1, -100, 2]); // -100
 *
 * @param iterable Numeric iterable collection
 * @returns Minimum element
 */
export function min(iterable: Iterable<number>): number | undefined {
  let min;

  for (const num of iterable) {
    if (num < (min ?? Infinity)) {
      min = num;
    }
  }

  return min;
}

/**
 * Finds the minimum element of the asynchronous numeric iterable collection and returns promise with it
 *
 * @example
 *   new AsyncCollection([1, -100, 2]).collect(minAsync); // Promise {-100}
 *
 * @example
 *   minAsync(new AsyncCollection([1, -100, 2])); // Promise {-100}
 *
 * @async
 * @param iterable Asynchronous numeric iterable collection
 * @returns Promise with minimum element
 */
export async function minAsync(iterable: AsyncIterable<number>): Promise<number | undefined> {
  let min;

  for await (const num of iterable) {
    if (num < (min ?? Infinity)) {
      min = num;
    }
  }

  return min;
}
