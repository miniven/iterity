import { getIterator } from '../helpers';

export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterator(iterable);

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
