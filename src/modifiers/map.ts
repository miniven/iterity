import { getIterator } from '../core/helpers';

/**
 * Функция для преобразования значений исходного итератора в другие значения
 *
 * @param mapper Функция-преобразователь для значения
 * @returns Итератор
 */
export function map<T, R>(mapper: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R> {
  return function (iterable: Iterable<T>): IterableIterator<R> {
    const iterator = getIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const next = iterator.next();

        if (next.done) {
          return { done: true, value: undefined };
        }

        return { done: false, value: mapper(next.value) };
      },
    };
  };
}
