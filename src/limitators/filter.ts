import { getIterator } from '../core/helpers';

export function filter<T>(predicate: (value: T) => boolean) {
  return function (iterable: Iterable<T>): IterableIterator<T> {
    const iterator = getIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let next = iterator.next();

        if (next.done) {
          return next;
        }

        while (!next.done && !predicate(next.value)) {
          next = iterator.next();
        }

        return next;
      },
    };
  };
}
