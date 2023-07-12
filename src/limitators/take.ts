import { getIterator } from '../core/helpers';

// @TODO Добавить поддержку отрицательного лимита, чтобы брать не первые, а последние N значений
export function take<T>(limit: number) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const next = iterator.next();

        limit--;

        if (next.done || limit < 0) {
          return {
            value: undefined,
            done: true,
          };
        }

        return next;
      },
    };
  };
}
