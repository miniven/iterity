/**
 * Iterates through collection and calls callback function for every element
 *
 * @example
 *   forEach([1, 2, 3], (value) => {
 *     console.log(value);
 *   });
 *
 * @param iterable Iterable value
 * @param callback Сallback function to be called for every element
 */
export function forEach<T>(iterable: Iterable<T>, callback: (value: T, iterable: Iterable<T>) => void) {
  for (const value of iterable) {
    callback(value, iterable);
  }
}

/**
 * Iterates through asynchronous collection and calls callback function for every element
 *
 * @example
 *   forEachAsync(new AsyncCollection([1, 2, 3]), (value) => {
 *     console.log(value);
 *   });
 *
 * @param iterable Asynchronous iterable value
 * @param callback Сallback function to be called for every element
 */
export async function forEachAsync<T>(
  iterable: AsyncIterable<T>,
  callback: (value: T, iterable: AsyncIterable<T>) => void
) {
  for await (const value of iterable) {
    callback(value, iterable);
  }
}
