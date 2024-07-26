/**
 * Return iterator of the iterable object
 *
 * @param value Iterable object
 * @returns Iterator
 */
export function getIterator<T>(value: Iterable<T>): Iterator<T> {
  return value[Symbol.iterator]();
}

/**
 * Return asynchronous iterator of the iterable object
 *
 * @param value Asynchronous iterable object
 * @returns Asynchronous iterator
 */
export function getAsyncIterator<T>(value: AsyncIterable<T>): AsyncIterator<T> {
  return value[Symbol.asyncIterator]();
}
