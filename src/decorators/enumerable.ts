import { getIterator } from '../core/helpers';

/**
 * Добавляет порядковые номера (индексы) для каждого элемента коллекции. Новая коллекция содержит кортежи вида [index, value].
 *
 * @param iterable Перебираемая коллекция
 * @returns Новая коллекция
 */
export function enumerable<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  const iterator = getIterator(iterable);

  let index = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = iterator.next();

      if (done) {
        return {
          value: undefined,
          done: true,
        };
      }

      return {
        value: [index++, value],
        done: false,
      };
    },
  };
}
