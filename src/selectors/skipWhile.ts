import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  SKIPPED = 'SKIPPED',
}

/**
 * Возвращает функцию для создания итератора, пропускающего N первых элементов, пока соблюдается условие
 *
 * @param predicate Функция-предикат, которая возвращает true для элементов, которые должны быть пропущены
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function skipWhileSync<T>(predicate: (value: T) => boolean) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let state = State.IDLE;

    return createIterableIterator(function () {
      let next = iterator.next();

      while (predicate(next.value) && state === State.IDLE) {
        next = iterator.next();
      }

      state = State.SKIPPED;

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания асинхронного итератора, пропускающего N первых элементов, пока соблюдается условие
 *
 * @param predicate Функция-предикат, которая возвращает true для элементов, которые должны быть пропущены
 * @returns Функция, принимающая асинхронный итерируемый объект и возвращающая асинхронный итератор
 */
export function skipWhileAsync<T>(predicate: (value: T) => boolean) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let state = State.IDLE;

    return createAsyncIterableIterator(async function () {
      let next = iterator.next();
      const result = await next;

      while (predicate(result.value) && state === State.IDLE) {
        next = iterator.next();
      }

      state = State.SKIPPED;

      if (result.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания синхронного или асинхронного итератора, пропускающего N первых элементов, пока соблюдается условие
 *
 * @param predicate Функция-предикат, которая возвращает true для элементов, которые должны быть пропущены
 * @returns Функция, принимающая итерируемый объект и возвращающая синхронный/асинхронный итератор
 */
export function skipWhile<R>(predicate: (value: R) => boolean) {
  function helper<TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper<TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return skipWhileAsync(predicate)(iterable);
    }

    return skipWhileSync(predicate)(iterable);
  }

  return helper;
}
