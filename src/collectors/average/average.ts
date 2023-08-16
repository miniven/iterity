/**
 * Returns calculated average of numeric collection
 *
 * @example
 *   from([1, 2, 3]).collect(average);
 *
 * @example
 *   average([1, 2, 3]);
 *
 * @param iterable Iterable collection
 * @returns Average of numeric collection
 */
export function average(iterable: Iterable<number>): number {
  let sum = 0;
  let count = 0;

  for (const num of iterable) {
    sum += num;
    count++;
  }

  return count ? sum / count : sum;
}

/**
 * Returns promise with calculated average of numeric collection
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(averageAsync);
 *
 * @example
 *   average(new AsyncCollection([1, 2, 3]));
 *
 * @async
 * @param iterable Asynchronous iterable collection
 * @returns Promise with average of numeric collection
 */
export async function averageAsync(iterable: AsyncIterable<number>): Promise<number> {
  let sum = 0;
  let count = 0;

  for await (const num of iterable) {
    sum += num;
    count++;
  }

  return count ? sum / count : sum;
}
