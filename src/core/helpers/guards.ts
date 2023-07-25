/**
 * Type Guard. Check if passed value is iterable
 *
 * @param value Any value to check
 * @returns If passed value is iterable
 */
export function isIterable<T>(value: any): value is Iterable<T> {
  return typeof value[Symbol.iterator] === 'function';
}

/**
 * Type Guard. Check if passed value has asynchronous iterator
 *
 * @param value Any value to check
 * @returns If passed value has asynchronous iterator
 */
export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return typeof value[Symbol.asyncIterator] === 'function';
}
