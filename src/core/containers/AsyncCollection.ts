import { AbstractCollection } from './AbstractCollection';
import { getAsyncIterableIterator, isAsyncIterable, isIterable } from '../../helpers';
import { iterableToAsyncIterable, toAsyncIterableValue } from '../../helpers/transformers';

import type { TAsyncOperation, TAsyncPipeMethod } from '../types';

type TValue<T> = T | Iterable<T> | AsyncIterable<T>;

/**
 * Контейнер для значения, с которым необходимо работать как с асинхронной итерируемой коллекцией.
 *
 * @class AsyncCollection<T>
 */
export class AsyncCollection<T> extends AbstractCollection<TValue<T>> implements AsyncIterable<T> {
  /**
   * Приводит переданное значение к итерируемому типу, если оно таким не является изначально
   *
   * @param value Любое значение, которое будет приведено к итерируемому, если таким не является
   * @returns {AsyncIterable} Асинхронный итератор
   */
  static toAsyncIterable<T>(value: TValue<T>): AsyncIterable<T> {
    if (isAsyncIterable(value)) {
      return value;
    }

    if (isIterable(value)) {
      return iterableToAsyncIterable(value);
    }

    return toAsyncIterableValue(value);
  }

  transform(transformer: (value: TValue<T>) => TValue<T>): AsyncCollection<TValue<T>>;

  transform<TNextContainer extends AbstractCollection<any>>(
    transformer: (value: TValue<T>) => TNextContainer
  ): TNextContainer;

  transform(transformer: (value: TValue<T>) => TValue<T> | AbstractCollection<any>): AbstractCollection<any> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof AbstractCollection) {
      return nextValue;
    }

    return new AsyncCollection(nextValue);
  }

  pipe: TAsyncPipeMethod<T> = (...operations: Array<TAsyncOperation<any, any>>): AsyncCollection<T> => {
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
