/**
 * Finds the maximum element of the numeric iterable collection and returns it
 *
 * @example
 *   from([1, 100, 2]).collect(max); // 100
 *
 * @example
 *   max([1, 100, 2]); // 100
 *
 * @param iterable Numeric iterable collection
 * @returns Maximum element
 */
export function max(iterable: Iterable<number>): number | undefined {
  let max;

  for (const num of iterable) {
    if (num > (max ?? -Infinity)) {
      max = num;
    }
  }

  return max;
}

/**
 * Finds the maximum element of the asynchronous numeric iterable collection and returns promise with it
 *
 * @example
 *   new AsyncCollection([1, 100, 2]).collect(maxAsync); // Promise {100}
 *
 * @example
 *   maxAsync(new AsyncCollection([1, 100, 2])); // Promise {100}
 *
 * @async
 * @param iterable Asynchronous numeric iterable collection
 * @returns Promise with maximum element
 */
export async function maxAsync(iterable: AsyncIterable<number>): Promise<number | undefined> {
  let max;

  for await (const num of iterable) {
    if (num > (max ?? -Infinity)) {
      max = num;
    }
  }

  return max;
}
