import { getIterableIterator, isIterable, toIterableValue } from '../../helpers';

import type { TOperation } from '../types';

/**
 * Базовый класс, задающий структуру всех видов контейнеров для работы с перебираемыми коллекциями
 *
 * @class CoreCollection<T>
 */
export abstract class CoreCollection<T> implements Iterable<T> {
  /**
   * Приводит переданное значение к итерируемому типу, если оно таким не является изначально
   *
   * @param value Любое значение, которое будет приведено к итерируемому, если таким не является
   * @returns {Iterable} Итератор
   */
  protected static makeIterable<T>(value: T | Iterable<T>): Iterable<T> {
    return isIterable(value) ? value : toIterableValue(value);
  }

  /**
   * Значение, хранящееся в контейнере
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
   * @description Метод возвращает контейнерный тип: либо тот же, либо новый. Это способ передать значнеие от одного контейнера к другому.
   *
   * @param {Function} transformer Функция для возврата нового контейнера.
   * @returns {CoreCollection} Новый контейнер, хранящий значение
   */
  abstract transform(transformer: (value: T | Iterable<T>) => T | Iterable<T> | CoreCollection<T>): CoreCollection<T>;

  /**
   * Метод для передачи функций, которые преобразовывают значения коллекции, или меняют поведение при итерации
   *
   * @description Метод возвращает тот же контейнерный тип, но с новым значением. Это способ изменить значение в контейнере.
   *
   * @param {Function} operations Функции для преобразования коллекции
   * @returns {CoreCollection} Контейнер, содержащий преобразованную коллекцию
   */
  abstract pipe(...operations: Array<TOperation<any, any>>): CoreCollection<any>;

  /**
   * Функция для преобразования коллекции к конечному значению и возврата этого значения
   *
   * @description Метод возвращает значение, каким оно было возвращено из функции. Это способ привести контейнерный тип к произвольному типу.
   *
   * @param {Function} collector Функция-коллектор для преобразования коллекции к одному значению
   * @returns Конечное значение
   */
  collect<R>(collector: (iterable: Iterable<T>) => R): R {
    return collector(this);
  }

  [Symbol.iterator](): IterableIterator<T> {
    const toCollectionTypeIterator = this._getContainerTypeModifier();
    const iterator = getIterableIterator(CoreCollection.makeIterable(this._value));

    return toCollectionTypeIterator(iterator);
  }
}
