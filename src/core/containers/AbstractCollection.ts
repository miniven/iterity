import { TAsyncOperation, TOperation } from '../types';

export abstract class AbstractCollection<TValue> {
  /**
   * Raw value, which was put in the container
   */
  protected _value: TValue;

  /**
   * If iterator of the container can be resumed after break
   */
  protected _resumable: boolean = false;

  /**
   * @constructor
   * @param {Iterable} value Raw value, which will be put in the container
   */
  constructor(value: TValue) {
    this._value = value;
  }

  /**
   * Method for changing the container type. Returns a container type:
   * either same container type or brand new if you need to pass the value to another container
   *
   * @example
   *   new Collection([1, 2, 3]).switch(toSet);
   *
   * @param {Function} switcher Function which returns any value or new container
   * @returns {AbstractCollection} The container, returned from switcher, or new container with returned value
   */
  abstract switch(switcher: (value: TValue) => TValue): AbstractCollection<TValue>;
  abstract switch<T>(switcher: (value: TValue) => AbstractCollection<T>): AbstractCollection<T>;

  /**
   * Method for creating a composition of iterators. Returns new instance of the same container type.
   * This method behaves like we change the value in container.
   *
   * @example
   *   new Collection([1, 2, 3]).pipe(take(5), enumarable);
   *
   * @param {Function} operations Functions which add iterators over the original iterated value
   * @returns {AbstractCollection} New iterable container with new value
   */
  abstract pipe(...operations: Array<TOperation<any, any>>): AbstractCollection<TValue>;
  abstract pipe(...operations: Array<TAsyncOperation<any, any>>): AbstractCollection<TValue>;

  /**
   * Method for reducing a collection to a single value. Returns exactly that value which returns the collector function.
   *
   * @example
   *   new Collection([1, 2, 3]).collect(product);
   *
   * @param {Function} collector Function which reduces a collection to a single value
   * @returns value
   */
  abstract collect<R>(collector: (iterable: TValue) => R): R;

  /**
   * Makes iterator of the container resumable, so that it can be resumed after break
   */
  toResumable() {
    this._resumable = true;

    return this;
  }

  /**
   * Makes iterator of the container disposable, so that it can not be resumed after break
   */
  toDisposable() {
    this._resumable = false;

    return this;
  }

  /**
   * Returns if iterator of the container can be resumed after break
   */
  isResumable() {
    return this._resumable;
  }
}
