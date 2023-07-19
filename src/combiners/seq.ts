import { createIteratorReturn, getIterator } from '../core';

function sequence<T>(...iterables: Array<Iterable<T>>): IterableIterator<T> {
  const iterablesIterator = getIterator(iterables);

  let currentIterator = iterablesIterator.next().value[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const next = currentIterator.next();

      /**
       * Если текущий вложенный итератор закончился, смотрим следующий
       */
      if (next.done) {
        const nextIterator = iterablesIterator.next();

        /**
         * Если следующего нет, считаем, что закончили
         */
        if (nextIterator.done) {
          return createIteratorReturn();
        }

        /**
         * Иначе начинаем итерацию по следующему вложенному итератору
         */
        currentIterator = nextIterator.value[Symbol.iterator]();

        return currentIterator.next();
      }

      /**
       * Возвращаем текущее значение текущего вложенного итератора
       */
      return next;
    },
  };
}

export function prepend<T, R>(...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(...iterables, iterable);
  };
}

export function append<T, R>(...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(iterable, ...iterables);
  };
}
