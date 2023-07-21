/**
 * Создаёт объект, который возвращает метод next итератора, если обход не завершён
 * { done: false, value }
 *
 * @param value Значение свойства value
 * @returns Объект, который возвращает метод next
 */
export const createIteratorYield = <T>(value: T): IteratorYieldResult<T> => ({
  done: false,
  value,
});

/**
 * Создаёт объект, который возвращает метод next итератора, если обход завершён
 * { done: true, value: undefined }
 *
 * @returns Объект, который возвращает метод next
 */
export const createIteratorReturn = (): IteratorReturnResult<undefined> => ({
  done: true,
  value: undefined,
});

/**
 * Создаёт асинхронный итератор и призваивает методу next переданную функцию
 * Избавляет от повторяющегося кода при описании асинхронного итератора
 *
 * @param next Метод next асинхронного итератора
 * @returns Асинхронный итератор
 */
export function createAsyncIterableIterator<T>(next: AsyncIterator<T>['next']): AsyncIterableIterator<T> {
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next,
  };
}

/**
 * Создаёт итератор и призваивает методу next переданную функцию
 * Избавляет от повторяющегося кода при описании итератора
 *
 * @param next Метод next итератора
 * @returns Итератор
 */
export function createIterableIterator<T>(next: Iterator<T>['next']): IterableIterator<T> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next,
  };
}
