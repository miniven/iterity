import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Функция для создания итератора, перебирающего первые элементы исходного итератора, пока соблюдается условие.
 *
 * @param predicate Функция-предикат
 * @returns Функция, создающая итератор
 */
export function takeWhile<T>(predicate: (value: T) => boolean) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let state = State.IDLE;

    return createIterableIterator(function () {
      const next = iterator.next();

      if (next.done || !predicate(next.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Функция для создания асинхронного итератора, перебирающего первые элементы исходного итератора, пока соблюдается условие.
 *
 * @param predicate Функция-предикат
 * @returns Функция, создающая итератор
 */
export function takeWhileAsync<T>(predicate: (value: T) => boolean) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let state = State.IDLE;

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();
      const result = await next;

      if (result.done || !predicate(result.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}
