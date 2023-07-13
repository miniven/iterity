import { getIterator } from '../core/helpers';

/**
 * Получает коллекции и возвращает одну, которая будет итерировать по элементам всех коллекций
 *
 * @param iterables Перебираемые коллекции в качестве аргументов функции
 * @returns Перебираемая коллекция всех элементов всех переданных коллекции
 */
export function seq<T>(...iterables: Array<Iterable<T>>): IterableIterator<T> {
  const iterablesIterator = getIterator(iterables);

  let currentIterator = iterablesIterator.next().value[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const next = currentIterator.next();

      /**
       * Если текущий вложенный итератор закончился, смотрим следующий
       */
      if (next.done) {
        const nextIterator = iterablesIterator.next();

        /**
         * Если следующего нет, считаем, что закончили
         */
        if (nextIterator.done) {
          return { done: true, value: undefined };
        }

        /**
         * Иначе начинаем итерацию по следующему вложенному итератору
         */
        currentIterator = nextIterator.value[Symbol.iterator]();

        return currentIterator.next();
      }

      /**
       * Возвращаем текущее значение текущего вложенного итератора
       */
      return next;
    },
  };
}
