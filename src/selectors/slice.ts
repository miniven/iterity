import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Создаёт функцию, которая создаёт итератор для определённого диапазона значений.
 *
 * @param from Индекс начала диапазона. Элемент с этим индексом включается в диапазон.
 * @param to Индекс конца диапазона. Элемент с этим индексом не включается в диапазон.
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function slice(from: number, to: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let pointer = 0;

    return createIterableIterator(function () {
      let next = iterator.next();

      while (pointer < from && !next.done) {
        next = iterator.next();
        pointer++;
      }

      if (next.done || pointer >= to) {
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
 * @param to Индекс конца диапазона. Элемент с этим индексом не включается в диапазон.
 * @returns Функция, принимающая итерируемый объект и возвращающая асинхронный итератор
 */
export function sliceAsync(from: number, to: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let pointer = 0;

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && pointer < from) {
        next = await iterator.next();
        pointer++;
      }

      if (next.done || pointer >= to) {
        return createIteratorReturn();
      }

      pointer++;

      return next;
    });
  };
}
