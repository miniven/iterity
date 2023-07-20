import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core/helpers';

/**
 * Функция для создания итератора для первых N элементов исходного итератора.
 *
 * @param limit Количество первых элементов
 * @returns Функция, создающая итератор
 */
export function take(limit: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      limit--;

      if (next.done || limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Функция для создания асинхронного итератора для первых N элементов исходного итератора.
 *
 * @param limit Количество первых элементов
 * @returns Функция, создающая итератор
 */
export function takeAsync(limit: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();

      limit--;

      if (limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}
