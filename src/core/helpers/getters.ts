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
 * Возвращает новый итерируемый итератор переданного объекта
 *
 * @param value Итерируемый объект
 * @returns Итерируемый итератор
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
 * Возвращает новый итерируемый асинхронный итератор переданного объекта
 *
 * @param value Итерируемый объект
 * @returns Итерируемый асинхронный итератор
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
