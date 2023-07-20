import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Возвращает функцию для создания итератора, пропускающего N первых элементов
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function skip(amount: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      while (amount && !next.done) {
        next = iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания асинхронного итератора, пропускающего N первых элементов
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns Функция, принимающая асинхронный итерируемый объект и возвращающая асинхронный итератор
 */
export function skipAsync(amount: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && amount) {
        next = await iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
