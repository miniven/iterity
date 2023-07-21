import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Функция для преобразования значений исходного итератора в другие значения
 *
 * @param mapper Функция-преобразователь для значения
 * @returns Итератор
 */
export function map<T, R>(mapper: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R> {
  return function (iterable: Iterable<T>): IterableIterator<R> {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      if (next.done) {
        return next;
      }

      return createIteratorYield(mapper(next.value));
    });
  };
}

/**
 * Функция для преобразования значений асинхронного итератора в другие значения
 *
 * @param mapper Функция-преобразователь для значения
 * @returns Асинхронный Итератор
 */
export function mapAsync<T, R>(mapper: (value: T) => R) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<R> {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = await iterator.next();

      if (next.done) {
        return next;
      }

      return createIteratorYield(mapper(next.value));
    });
  };
}
