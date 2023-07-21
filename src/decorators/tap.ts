import {
  createAsyncIterableIterator,
  createIterableIterator,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../core';

/**
 * Создает итератор, который возвращает те же элементы, что и исходная коллекция,
 * но позволяет выполнить заданное действие (эффект) для каждого элемента при прохождении по ним.
 *
 * @param effect Коллбэк-функция, которая будет вызвана для каждого элемента при обходе коллекции
 * @returns Итератор
 */
export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      if (!next.done) {
        effect(next.value);
      }

      return next;
    });
  };
}

/**
 * Создает асинхронный итератор, который возвращает те же элементы, что и исходная коллекция,
 * но позволяет выполнить заданное действие (эффект) для каждого элемента при прохождении по ним.
 *
 * @param effect Коллбэк-функция, которая будет вызвана для каждого элемента при обходе коллекции
 * @returns Итератор
 */
export function tapAsync<T>(effect: (value: T) => void) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = await iterator.next();

      if (!next.done) {
        effect(next.value);
      }

      return next;
    });
  };
}
