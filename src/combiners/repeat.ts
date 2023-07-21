import { createIterableIterator, createIteratorReturn, getIterator } from '../core';

/**
 * Создаёт итератор, который повторяет исходную коллекцию заданное количество раз. По умолчанию — бесконечно.
 *
 * @param times Количество повторений
 * @returns Функция, создающая итератор
 */
export function repeat<T>(times: number = Infinity) {
  return function (iterable: Iterable<T>): IterableIterator<T> {
    let iterator = getIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      if (next.done) {
        iterator = getIterator(iterable);
        next = iterator.next();
        times--;
      }

      if (times === 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
