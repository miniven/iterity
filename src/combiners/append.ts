import { seq } from './seq';

/**
 * Возвращает функцию, которая комбинирует переданную коллекцию с переданными ранее коллекциями,
 * помещая ранее переданные коллекции перед текущей коллекцией.

 *
 * @param iterables Перебираемые коллекции в качестве аргументов функции
 * @returns Функция
 */
export function append<T, R>(...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return seq<T | R>(iterable, ...iterables);
  };
}
