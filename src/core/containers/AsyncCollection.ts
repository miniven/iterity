import { getAsyncIterableIterator, isAsyncIterable, isCollectionInstance, isIterable } from '../../helpers';
import { iterableToAsyncIterable, toAsyncIterableValue } from '../../helpers/transformers';

import type { ICollection, TAsyncOperation, TAsyncPipeMethod } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с асинхронной итерируемой коллекцией.
 *
 * @class AsyncCollection<T>
 */
export class AsyncCollection<T> implements ICollection<T>, AsyncIterable<T> {
  /**
   * Приводит переданное значение к итерируемому типу, если оно таким не является изначально
   *
   * @param value Любое значение, которое будет приведено к итерируемому, если таким не является
   * @returns {AsyncIterable} Асинхронный итератор
   */
  static toAsyncIterable<T>(value: T | Iterable<T> | AsyncIterable<T>): AsyncIterable<T> {
    if (isAsyncIterable(value)) {
      return value;
    }

    if (isIterable(value)) {
      return iterableToAsyncIterable(value);
    }

    return toAsyncIterableValue(value);
  }

  /**
   * Значение, хранящееся в контейнере
   */
  protected _value: T | Iterable<T> | AsyncIterable<T>;

  /**
   * @constructor
   * @param {Iterable} value Значение, которое будет помещено в контейнер. Не перебираемое значение преобразуется к перебираемому.
   */
  constructor(value: T | Iterable<T> | AsyncIterable<T>) {
    this._value = value;
  }

  transform<R extends ICollection<any>>(
    transformer: (value: T | Iterable<T> | AsyncIterable<T>) => T | Iterable<T> | AsyncIterable<T> | R
  ): R {
    const nextValue = transformer(this._value);

    if (isCollectionInstance<R>(nextValue)) {
      return nextValue;
    }

    return new AsyncCollection(nextValue) as unknown as R;
  }

  pipe: TAsyncPipeMethod<T> = (...operations: Array<TAsyncOperation<any, any>>): AsyncCollection<any> => {
    return new AsyncCollection(
      operations.reduce((value, func) => func(value), AsyncCollection.toAsyncIterable(this._value))
    );
  };

  collect<R>(collector: (iterable: AsyncIterable<T>) => R): R {
    return collector(this);
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return getAsyncIterableIterator(AsyncCollection.toAsyncIterable(this._value));
  }
}
