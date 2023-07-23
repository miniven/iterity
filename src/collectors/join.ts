/**
 * Joins all elements of the iterable string collection to one string and returns it
 *
 * @example
 *   from(["1", "2", "3"]).collect(join('_')); // "1_2_3"
 *
 * @example
 *   join('_')(["1", "2", "3"]); // "1_2_3"
 *
 * @param separator A string used to separate one element of the array from the next
 * @returns Function
 */
export function join(separator: string = '') {
  return function (iterable: Iterable<string>): string {
    return [...iterable].join(separator);
  };
}

/**
 * Joins all elements of the iterable string collection to one string and returns promise with it
 *
 * @example
 *   new AsyncCollection(["1", "2", "3"]).collect(joinAsync('_')); // Promise {"1_2_3"}
 *
 * @example
 *   joinAsync('_')(new AsyncCollection(["1", "2", "3"])); // Promise {"1_2_3"}
 *
 * @param separator A string used to separate one element of the array from the next
 * @returns Function
 */
export function joinAsync(separator: string = '') {
  return async function (iterable: AsyncIterable<string>): Promise<string> {
    const elements = [];

    for await (const value of iterable) {
      elements.push(value);
    }

    return elements.join(separator);
  };
}
