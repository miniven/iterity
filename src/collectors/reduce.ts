import { getIterableIterator } from '../core/helpers/utils';
import { enumerable } from '../decorators/enumerable';

/**
 * Функция для приведения элементов коллекции к одному значению. Аналог Array.prototype.reduce.
 *
 * @param reducer Функция, которая вызывается для каждого элемента коллекции
 * @param initial Начальное значение. Если не указано, то начальным значением будет первый элемент коллекции,
 *  а итерация начнётся со второго элемента
 */
export function reduce<T>(reducer: (acc: T, value: T, index: number) => T): (iterable: Iterable<T>) => T;
export function reduce<T, U>(reducer: (acc: U, value: T, index: number) => U, initial: U): (iterable: Iterable<T>) => U;
export function reduce<T, U>(
  reducer: (acc: T | U, value: T, index: number) => T | U,
  initial?: U
): (iterable: Iterable<T>) => T | U {
  /**
   * Если не передан редьюсер, то сразу кидаем исключение
   */
  if (typeof reducer !== 'function') {
    throw new Error('Reducer was not provided');
  }

  const hasInitialValue = (initial?: U): initial is U => {
    return arguments.length >= reduce.length && initial !== undefined;
  };

  return function (iterable: Iterable<T>): T | U {
    const iterator = getIterableIterator(iterable);

    let acc = hasInitialValue(initial) ? initial : (iterator.next().value as T);

    for (const [index, value] of enumerable(iterator)) {
      if (index === 0 && !hasInitialValue(initial)) {
        continue;
      } else {
        acc = reducer(acc, value, index);
      }
    }

    return acc;
  };
}
