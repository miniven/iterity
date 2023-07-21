import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterator,
} from '../core';

/**
 * Создает итератор, который объединяет элементы переданных коллекций в одну.
 *
 * @params iterables Итерируемые коллекции
 * @returns Итератор
 */
export function sequence<T>(iterable: Iterable<T>, ...iterables: Array<Iterable<T>>): IterableIterator<T> {
  const iterablesIterator = getIterator(iterables);

  let currentIterator = getIterator(iterable);

  return createIterableIterator(function () {
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
      currentIterator = getIterator(nextIterator.value);

      return currentIterator.next();
    }

    /**
     * Возвращаем текущее значение текущего вложенного итератора
     */
    return next;
  });
}

/**
 * Создает асинхронный итератор, который объединяет элементы переданных коллекций в одну.
 *
 * @params iterables Асинхронные терируемые коллекции
 * @returns Асинхронный итератор
 */
export function sequenceAsync<T>(
  iterable: AsyncIterable<T>,
  ...iterables: Array<AsyncIterable<T>>
): AsyncIterableIterator<T> {
  const iterablesIterator = getIterator(iterables);

  let currentIterator = getAsyncIterableIterator(iterable);

  return createAsyncIterableIterator(async function () {
    const next = await currentIterator.next();

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
      currentIterator = getAsyncIterableIterator(nextIterator.value);

      return currentIterator.next();
    }

    /**
     * Возвращаем текущее значение текущего вложенного итератора
     */
    return next;
  });
}
