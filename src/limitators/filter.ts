import {
  createAsyncIterableIterator,
  createIterableIterator,
  getAsyncIterableIterator,
  getIterator,
  isAsyncIterable,
} from '../core';

/**
 * Возвращает функцию для создания итератора по элементам, удовлетворяющим предикату
 *
 * @param predicate Функция-предикат для проверки условия
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function filterSync<T>(predicate: (value: T) => boolean) {
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

/**
 * Возвращает функцию для создания синхронного/асинхронного итератора по элементам, удовлетворяющим предикату
 *
 * @param predicate Функция-предикат для проверки условия
 * @returns Функция, принимающая итерируемый объект и возвращающая синхронный/асинхронный итератор
 */
export function filter<R>(predicate: (value: R) => boolean) {
  function helper<TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper<TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return filterAsync(predicate)(iterable);
    }

    return filterSync(predicate)(iterable);
  }

  return helper;
}
