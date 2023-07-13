import { getIterableIterator, isIterable, toIterableValue } from '../helpers';

import type { TOperation } from '../types';

/**
 * Базовый класс, задающий структуру всех видов контейнеров для работы с перебираемыми коллекциями
 *
 * @class CoreCollection<T>
 */
export abstract class CoreCollection<T> implements Iterable<T> {
  protected static makeIterable<T>(value: T | Iterable<T>): Iterable<T> {
    return isIterable(value) ? value : toIterableValue(value);
  }
  /**
   * Перебираемая коллекция
   */
  protected _value: T | Iterable<T>;

  /**
   * @constructor
   * @param {Iterable} value Значение, которое будет помещено в контейнер. Не перебираемое значение преобразуется к перебираемому.
   */
  constructor(value: T | Iterable<T>) {
    this._value = value;
  }

  /**
   * Метод, который возвращает функцию преобразования перебираемой коллекции к типу, соответствующему конкретному классу
   *
   * @returns {Function} Функция преобразования перебираемой коллекции
   */
  protected abstract _getContainerTypeModifier(): (iterable: Iterable<T>) => IterableIterator<T>;

  /**
   * Метод для изменения типа контейнера. Изначально значение хранится в контейнере IterableContainer<T>, но этот метод
   * позволяет изменить тип контейнера, например, на Resumable<T>, или на обыкновенный массив
   *
   * @param {Function} transformer Функция для возврата нового контейнера.
   * @returns {Iterable} Новый контейнер, хранящий значение
   */
  abstract transform<R>(
    transformer: (value: T | Iterable<T>) => R | Iterable<R> | CoreCollection<R>
  ): CoreCollection<R>;

  /**
   * Метод для передачи функций, которые преобразовывают значения коллекции, или меняют поведение при итерации
   *
   * @param {Function} operations Функции для преобразования коллекции
   * @returns {Resumable} Контейнер, содержащий преобразованную коллекцию
   */
  abstract pipe(...operations: Array<TOperation<any, any>>): CoreCollection<any>;

  /**
   * Метод для эффективного разворачивания перебираемого объекта в обратном порядке.
   * Если в контейнере хранится массив, то итерация в обратном порядке будет оптимизирована через доступ по индексу.
   */
  abstract reverse(): CoreCollection<T>;

  /**
   * Функция для преобразования коллекции к конечному значению и возврата этого значения
   *
   * @param {Function} collector Функция-коллектор для преобразования коллекции к одному значению
   * @returns Конечное значение
   */
  collect<R>(collector: (iterable: Iterable<T>) => R): R {
    return collector(this);
  }

  [Symbol.iterator](): IterableIterator<T> {
    const modifier = this._getContainerTypeModifier();
    const iterator = getIterableIterator(CoreCollection.makeIterable(this._value));

    return modifier(iterator);
  }
}
