import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterator,
} from '../../core';

/**
 * Creates an iterator that combines the elements of the passed collections into one collection.
 *
 * @example
 *   sequence([1, 2], new Set([3, 4]), [5]); // [1, 2, 3, 4, 5]
 *
 * @params iterables Iterable collections
 * @returns Iterable iterator
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
 * Creates an asyncronous iterator that combines the elements of the passed collections into one collection.
 *
 * @example
 *   const collection = sequenceAsync(new AsyncCollection([1, 2]), new AsyncCollection([4, 5]));
 *
 *   for await (const value of collection) {
 *     console.log(value);
 *   }
 *
 * @params iterables Asynchronous iterable collections
 * @returns Asynchronous iterable iterator
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
