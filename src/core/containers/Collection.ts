import {
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
  isCollectionInstance,
  isIterable,
} from '../../helpers';
import { iterableToAsyncIterable, toAsyncIterableValue, toIterableValue } from '../../helpers/transformers';

import type { ICollection, TAsyncOperation, TAsyncPipeMethod, TOperation, TPipeMethod } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с итерируемой коллекцией.
 *
 * @class Collection<T>
 */
export class Collection<T> implements ICollection<T>, Iterable<T> {
  /**
   * Приводит переданное значение к итерируемому типу, если оно таким не является изначально
   *
   * @param value Любое значение, которое будет приведено к итерируемому, если таким не является
   * @returns {Iterable} Итератор
   */
  static toIterable<T>(value: T | Iterable<T>): Iterable<T> {
    if (isIterable(value)) {
      return value;
    }

    return toIterableValue(value);
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

  transform<R extends ICollection<any>>(transformer: (value: T | Iterable<T>) => T | Iterable<T> | R): R {
    const nextValue = transformer(this._value);

    if (isCollectionInstance<R>(nextValue)) {
      return nextValue;
    }

    return new Collection(nextValue) as unknown as R;
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Collection<any> => {
    return new Collection(operations.reduce((value, func) => func(value), Collection.toIterable(this._value)));
  };

  collect<R>(collector: (iterable: Iterable<T>) => R): R {
    return collector(this);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return getIterableIterator(Collection.toIterable(this._value));
  }
}
