import { sequence, sequenceAsync } from './sequence';

/**
 * Создает итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции после исходной.
 *
 * @param iterables Итерируемые коллекции
 * @returns Функция, создающая итератор
 */
export function append<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>) {
  return function (iterable: Iterable<T>): IterableIterator<T | R> {
    return sequence<T | R>(iterable, additional, ...iterables);
  };
}

/**
 * Создает асинхронный итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции после исходной.
 *
 * @param iterables Итерируемые коллекции
 * @returns Функция, создающая асинхронный итератор
 */
export function appendAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>) {
  return function (iterable: AsyncIterable<T>): AsyncIterableIterator<T | R> {
    return sequenceAsync<T | R>(iterable, additional, ...iterables);
  };
}
