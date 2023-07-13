import { seq } from './seq';

/**
 * Возвращает функцию, которая комбинирует переданную коллекцию с переданными ранее коллекциями,
 * помещая ранее переданные коллекции после текущей коллекции.

 *
 * @param iterables Перебираемые коллекции в качестве аргументов функции
 * @returns Функция
 */
export function prepend<T, R>(...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return seq<T | R>(...iterables, iterable);
  };
}
