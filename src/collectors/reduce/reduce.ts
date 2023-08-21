import { enumerable } from '../../decorators/enumerable';

const enum ErrorMessage {
  NO_REDUCER = 'Reducer was not provided',
}

type TReduceReturnType<T, Return> = (iterable: Iterable<T>) => Return | undefined;

/**
 * Функция для приведения элементов коллекции к одному значению. Аналог Array.prototype.reduce.
 *
 * @param reducer Функция, которая вызывается для каждого элемента коллекции
 * @param initial Начальное значение. Если не указано, то начальным значением будет первый элемент коллекции,
 *  а итерация начнётся со второго элемента
 */
export function reduce<T>(reducer: (acc: T, value: T, index: number) => T): TReduceReturnType<T, T>;
export function reduce<T, U>(reducer: (acc: U, value: T, index: number) => U, initial: U): TReduceReturnType<T, U>;
export function reduce<T, U>(
  reducer: (acc: T | U, value: T, index: number) => T | U,
  initial?: U
): TReduceReturnType<T, T | U> {
  /**
   * Если не передан редьюсер, то сразу кидаем исключение
   */
  if (typeof reducer !== 'function') {
    throw new Error(ErrorMessage.NO_REDUCER);
  }

  const hasInitialValue = (initial?: U): initial is U => {
    return arguments.length >= reduce.length && initial !== undefined;
  };

  return function (iterable) {
    const iterator = enumerable(iterable);

    let acc: T | U | undefined;

    if (hasInitialValue(initial)) {
      acc = initial;
    } else {
      const next = iterator.next();

      if (next.done) {
        return acc;
      }

      acc = next.value[1];
    }

    for (const [index, value] of iterator) {
      acc = reducer(acc, value, index);
    }

    return acc;
  };
}
