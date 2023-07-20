import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core';

/**
 * Создаёт функцию, которая создаёт итератор для определённого диапазона значений.
 *
 * @param from Индекс начала диапазона. Элемент с этим индексом включается в диапазон.
 * @param length Количество элементов в диапазоне.
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function sliceSync(from: number, length: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let pointer = 0;

    return createIterableIterator(function () {
      let next = iterator.next();

      while (pointer < from && !next.done) {
        next = iterator.next();
        pointer++;
      }

      if (next.done || pointer >= length) {
        return createIteratorReturn();
      }

      pointer++;

      return next;
    });
  };
}

/**
 * Создаёт функцию, которая создаёт асинхронный итератор для определённого диапазона значений.
 *
 * @param from Индекс начала диапазона. Элемент с этим индексом включается в диапазон.
 * @param length Количество элементов в диапазоне.
 * @returns Функция, принимающая итерируемый объект и возвращающая асинхронный итератор
 */
export function sliceAsync(from: number, length: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let pointer = 0;

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && pointer < from) {
        next = await iterator.next();
        pointer++;
      }

      if (next.done || pointer >= length) {
        return createIteratorReturn();
      }

      pointer++;

      return next;
    });
  };
}

/**
 * Создаёт функцию, которая создаёт синхронный/асинхронный итератор для определённого диапазона значений.
 *
 * @param from Индекс начала диапазона. Элемент с этим индексом включается в диапазон.
 * @param length Количество элементов в диапазоне.
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function slice(from: number, length: number) {
  function helper<R, TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper<R, TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper<R>(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return sliceAsync(from, length)(iterable);
    }

    return sliceSync(from, length)(iterable);
  }

  return helper;
}
