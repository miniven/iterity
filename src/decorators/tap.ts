import { getIterator } from '../core/helpers';

/**
 * Добавляет эффект, который будет вызван для каждого элемента при переборе коллекции, но никак не повлияет на саму коллекцию.
 *
 * @param effect Функция, которая будет вызвана для каждого элемента коллекции
 * @returns Функция, которая принимает коллекцию и добавляет к ней эффект
 */
export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterator(iterable);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const next = iterator.next();

        if (!next.done) {
          effect(next.value);
        }

        return next;
      },
    };
  };
}
