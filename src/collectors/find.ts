/**
 * Creates collector which returns the value of the first element of the collection where predicate is true,
 * and undefined otherwise.
 *
 * @example
 *   from([1, 2, 3]).collect(find((value) => value > 1)); // 2
 *
 * @example
 *   find((value) => value > 1)([1, 2, 3]); // 2
 *
 * @param predicate Function, which calls for every element of collection, until it returns true
 * @returns Function
 */
export function find<T>(predicate: (value: T) => boolean) {
  return function (iterable: Iterable<T>): T | undefined {
    for (const value of iterable) {
      if (predicate(value)) {
        return value;
      }
    }
  };
}

/**
 * Creates collector which returns the promise with value of the first element of the collection where predicate is true,
 * and undefined otherwise.
 *
 * @example
 *   new AsyncCollection([1, 2, 3]).collect(findAsync((value) => value > 1)); // Promise {2}
 *
 * @example
 *   findAsync((value) => value > 1)(new AsyncCollection([1, 2, 3])); // Promise {2}
 *
 * @param predicate Function, which calls for every element of collection, until it returns true
 * @returns Function
 */
export function findAsync<T>(predicate: (value: T) => boolean) {
  return async function (iterable: AsyncIterable<T>): Promise<T | undefined> {
    for await (const value of iterable) {
      if (predicate(value)) {
        return value;
      }
    }
  };
}
