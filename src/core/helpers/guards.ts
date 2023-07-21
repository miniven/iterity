/**
 * Type Guard. Проверяет, является ли значение итерируемым
 *
 * @param value Проверяемое значение
 * @returns Является ли значение итерируемым
 */
export function isIterable<T>(value: any): value is Iterable<T> {
  return typeof value[Symbol.iterator] === 'function';
}

/**
 * Type Guard. Проверяет, имеет ли значение асинхронный итератор
 *
 * @param value Проверяемое значение
 * @returns Имеет ли значение асинхронный итератор
 */
export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return typeof value[Symbol.asyncIterator] === 'function';
}
