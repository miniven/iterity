import { sequence, sequenceAsync } from './sequence';

/**
 * Создает итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции перед исходной.
 *
 * @params iterables Итерируемые коллекции
 * @returns Функция, создающая итератор
 */
export function prepend<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(additional, ...iterables, iterable);
  };
}

/**
 * Создает асинхронный итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции перед исходной.
 *
 * @params iterables Итерируемые коллекции
 * @returns Функция, создающая асинхронный итератор
 */
export function prependAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T | R> {
    return sequenceAsync<T | R>(additional, ...iterables, iterable);
  };
}
