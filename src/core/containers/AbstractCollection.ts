import { TAsyncOperation, TOperation } from '../types';

export abstract class AbstractCollection<TValue> {
  /**
   * Значение, хранящееся в контейнере
   */
  protected _value: TValue;

  /**
   * @constructor
   * @param {Iterable} value Значение, которое будет помещено в контейнер. Не перебираемое значение преобразуется к перебираемому.
   */
  constructor(value: TValue) {
    this._value = value;
  }

  /**
   * Метод для изменения типа контейнера. Изначально значение хранится в контейнере AsyncCollection<T>, но этот метод
   * позволяет изменить тип контейнера, например, на Collection<T>, или на обыкновенный массив
   *
   * @description Метод возвращает контейнерный тип: либо тот же, либо новый. Это способ передать значнеие от одного контейнера к другому.
   *
   * @param {Function} transformer Функция для возврата значения или контейнера.
   * @returns Новый контейнер, хранящий значение
   */
  abstract transform(transformer: (value: TValue) => TValue): AbstractCollection<TValue>;
  abstract transform<T>(transformer: (value: TValue) => AbstractCollection<T>): AbstractCollection<T>;

  /**
   * Метод для передачи функций, которые преобразовывают значения коллекции, или меняют поведение при итерации
   *
   * @description Метод возвращает тот же контейнерный тип, но с новым значением. Это способ изменить значение в контейнере.
   *
   * @param {Function} operations Функции для преобразования асинхронной коллекции
   * @returns {AsyncCollection} Контейнер, содержащий преобразованную коллекцию
   */
  abstract pipe(...operations: Array<TOperation<any, any>>): AbstractCollection<TValue>;
  abstract pipe(...operations: Array<TAsyncOperation<any, any>>): AbstractCollection<TValue>;

  /**
   * Функция для преобразования коллекции к конечному значению и возврата этого значения
   *
   * @description Метод возвращает значение, каким оно было возвращено из функции. Это способ привести контейнерный тип к произвольному типу.
   *
   * @param {Function} collector Функция-коллектор для преобразования коллекции к одному значению
   * @returns Конечное значение
   */
  abstract collect<R>(collector: (iterable: TValue) => R): R;
  abstract collect<R>(collector: (iterable: TValue) => R): R;
}
