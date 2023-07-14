import { getIterableIterator } from '../helpers';

export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const next = iterator.next();

        if (!next.done) {
          effect(next.value);
        }

        return next;
      },
    };
  };
}
