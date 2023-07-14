import { createIteratorReturn, getIterator } from '../helpers';

/**
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns
 */
export function skip<T>(amount: number) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let next = iterator.next();

        while (amount && !next.done) {
          next = iterator.next();
          amount--;
        }

        if (next.done) {
          return createIteratorReturn();
        }

        return next;
      },
    };
  };
}
