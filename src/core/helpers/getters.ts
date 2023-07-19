export function getIterator<T>(value: Iterable<T>): Iterator<T> {
  return value[Symbol.iterator]();
}

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
