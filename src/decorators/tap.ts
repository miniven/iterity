import { createIterableIterator, getIterableIterator } from '../core';

/**
 * Добавляет вызов эффекта при итерации объекта на каждый элемент
 *
 * @param effect Эффект, который будет вызвать для каждого элемента при итерации
 * @returns Итератор
 */
export function tap<T>(effect: (value: T) => void) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      if (!next.done) {
        effect(next.value);
      }

      return next;
    });
  };
}
