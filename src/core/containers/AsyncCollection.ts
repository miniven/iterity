import { AbstractCollection } from './AbstractCollection';
import { getAsyncIterableIterator, isAsyncIterable, isIterable } from '../helpers';
import { iterableToAsyncIterable, toAsyncIterableValue, toDisposableAsync } from '../helpers/transformers';

import type { TAsyncOperation, TAsyncPipeMethod } from '../types';

type TValue<T> = T | Iterable<T> | AsyncIterable<T>;

/**
 * Container for a value to work with as an asynchronous iterable collection
 *
 * @class AsyncCollection<T>
 */
export class AsyncCollection<T> extends AbstractCollection<TValue<T>> implements AsyncIterable<T> {
  /**
   * Makes the passed value asynchronous iterable type if it is not initially
   *
   * @param value Any value
   * @returns {AsyncIterable} Async iterable
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

  switch<TNextContainer extends AbstractCollection<any>>(
    switcher: (value: TValue<T>) => TNextContainer
  ): TNextContainer;

  switch(switcher: (value: TValue<T>) => TValue<T>): AsyncCollection<TValue<T>>;

  switch(switcher: (value: TValue<T>) => TValue<T> | AbstractCollection<any>): AbstractCollection<any> {
    const nextValue = switcher(this._value);

    if (nextValue instanceof AbstractCollection) {
      return nextValue;
    }

    return new AsyncCollection(nextValue);
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
    const iterator = getAsyncIterableIterator(AsyncCollection.toAsyncIterable(this._value));

    if (this._resumable) {
      /**
       * getAsyncIterableIterator возвращает итератор без метода return
       */
      return iterator;
    }

    return toDisposableAsync(iterator);
  }
}
