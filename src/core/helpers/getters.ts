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

/**
 * Extracts passed value iterator and returns new iterable iterator
 *
 * @param value Iterable value
 * @returns Iterable iterator for passed value
 */
export function getIterableIterator<T>(value: Iterable<T>): IterableIterator<T> {
  const iterator = value[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}

/**
 * Extracts passed value asynchronous iterator and returns new asynchronous iterable iterator
 *
 * @param value Asynchronous iterable value
 * @returns Asynchronous iterable iterator for passed value
 */
export function getAsyncIterableIterator<T>(value: AsyncIterable<T>): AsyncIterableIterator<T> {
  const iterator = value[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}
