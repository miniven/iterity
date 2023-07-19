import { createIterableIterator, createIteratorReturn, createIteratorYield, getIterableIterator } from '../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Создаёт итератор, где каждое значение в исходном итераторе поставляется вместе с индексом.
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
