import { AbstractCollection } from './AbstractCollection';
import { getIterableIterator, isAsyncIterable, isIterable } from '../helpers';
import { asyncIterableToIterable, toDisposable, toIterableValue } from '../helpers/transformers';

import type { IterableIteratorSpecified, TOperation, TPipeMethod } from '../types';

type TValue<T> = T | Iterable<T> | AsyncIterable<T>;

/**
 * Контейнер для значения, с которым необходимо работать как с итерируемой коллекцией.
 *
 * @class Collection<T>
 */
export class Collection<T> extends AbstractCollection<TValue<T>> implements Iterable<T> {
  /**
   * Приводит переданное значение к итерируемому типу, если оно таким не является изначально
   *
   * @param value Любое значение, которое будет приведено к итерируемому, если таким не является
   * @returns {Iterable} Итератор
   */
  static toIterable<T>(value: TValue<T>): Iterable<T>;
  static toIterable<T>(value: AsyncIterable<T>): IterableIteratorSpecified<Promise<T>, undefined, boolean | void> {
    if (isAsyncIterable(value)) {
      return asyncIterableToIterable(value, 10);
    }

    if (isIterable(value)) {
      return value;
    }

    return toIterableValue(value);
  }

  transform<TNextContainer extends AbstractCollection<any>>(
    transformer: (value: TValue<T>) => TNextContainer
  ): TNextContainer;
  transform(transformer: (value: TValue<T>) => TValue<T>): Collection<TValue<T>>;
  transform(transformer: (value: TValue<T>) => TValue<T> | AbstractCollection<any>): AbstractCollection<any> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof AbstractCollection) {
      return nextValue;
    }

    return new Collection(nextValue);
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Collection<T> => {
    return new Collection(operations.reduce((value, func) => func(value), Collection.toIterable(this._value)));
  };

  collect<R>(collector: (iterable: Iterable<T>) => R): R {
    return collector(this);
  }

  [Symbol.iterator](): IterableIterator<T> {
    const iterator = getIterableIterator(Collection.toIterable(this._value));

    if (this._resumable) {
      /**
       * getIterableIterator возвращает итератор без метода return
       */
      return iterator;
    }

    return toDisposable(iterator);
  }
}