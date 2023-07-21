import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Добавляет индекс к каждому элементу итерируемой коллекции.
 * Создаёт асинхронный итератор, который возвращает пары [индекс, значение] для каждого элемента исходной коллекции.
 *
 * @param iterable Итерируемый объект
 * @returns Асинхронный итератор
 */
export function enumerableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<[number, T]> {
  const iterator = getAsyncIterableIterator(iterable);

  let index = 0;
  let state = State.IDLE;

  return createAsyncIterableIterator(async function () {
    const { value, done } = await iterator.next();

    if (done || state === State.DONE) {
      state = State.DONE;

      return createIteratorReturn();
    }

    return createIteratorYield<[number, T]>([index++, value]);
  });
}

/**
 * Добавляет индекс к каждому элементу итерируемой коллекции.
 * Создаёт итератор, который возвращает пары [индекс, значение] для каждого элемента исходной коллекции.
 *
 * @param iterable Итерируемый объект
 * @returns Итератор
 */
export function enumerable<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  const iterator = getIterableIterator(iterable);

  let index = 0;
  let state = State.IDLE;

  return createIterableIterator(function () {
    const { value, done } = iterator.next();

    if (done || state === State.DONE) {
      state = State.DONE;

      return createIteratorReturn();
    }

    return createIteratorYield<[number, T]>([index++, value]);
  });
}
