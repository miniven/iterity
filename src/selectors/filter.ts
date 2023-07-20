import { createAsyncIterableIterator, createIterableIterator, getAsyncIterableIterator, getIterator } from '../core';

/**
 * Возвращает функцию для создания итератора по элементам, удовлетворяющим предикату
 *
 * @param predicate Функция-предикат для проверки условия
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function filter<T>(predicate: (value: T) => boolean) {
  return function (iterable: Iterable<T>): IterableIterator<T> {
    const iterator = getIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      if (next.done) {
        return next;
      }

      while (!next.done && !predicate(next.value)) {
        next = iterator.next();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания асинхронного итератора по элементам, удовлетворяющим предикату
 *
 * @param predicate Функция-предикат для проверки условия
 * @returns Функция, принимающая итерируемый объект и возвращающая асинхронный итератор
 */
export function filterAsync<T>(predicate: (value: T) => boolean) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      if (next.done) {
        return next;
      }

      while (!next.done && !predicate(next.value)) {
        next = await iterator.next();
      }

      return next;
    });
  };
}
