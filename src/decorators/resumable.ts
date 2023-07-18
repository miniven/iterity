import { getIterator } from '../core';

export function resumable<T>(iterable: Iterable<T>): IterableIterator<T> {
  const iterator = getIterator(iterable);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}
