import { createIterableIterator, createIteratorReturn, createIteratorYield } from '../helpers';

const enum Errors {
  METHODS_NOT_PROVIDED = 'No functions for reversal are provided. Provide either "reverse" or "getLength" and "getItem".',
}

const isReverseFunction = <R, T>(func: Function, argsLength: number): func is (iterable: R) => Iterator<T> => {
  return typeof func === 'function' && argsLength < 3;
};

/**
 * Represents a reversible iterable collection
 */
export class Reversible<T, R extends Iterable<T>> implements Iterable<T> {
  private _iterable: R;
  private _reversed = false;

  private _getReversedIterator: () => Iterator<T>;

  /**
   * Creates a new `Reversible` instance.
   *
   * @param iterable - The original iterable.
   * @param reverseOrGetLength - A function to get the length of the iterable or a function to get reversed iterable.
   * @param getItem - A function to get an item from the iterable by index.
   *
   * @throws If required methods are not provided.
   */
  constructor(iterable: R, getLength: (iterable: R) => number, getItem: (index: number, iterable: R) => T);
  constructor(iterable: R, reverse: (iterable: R) => Iterator<T>);
  constructor(
    iterable: R,
    reverseOrGetLength: ((iterable: R) => number) | ((iterable: R) => Iterator<T>),
    getItem?: (index: number, iterable: R) => T
  ) {
    this._iterable = iterable;

    /**
     * If `reverse` function was provided
     */
    if (isReverseFunction<R, T>(reverseOrGetLength, arguments.length)) {
      this._getReversedIterator = reverseOrGetLength.bind(this, this._iterable);

      return;
    }

    if (typeof reverseOrGetLength !== 'function' || typeof getItem !== 'function') {
      throw new Error(Errors.METHODS_NOT_PROVIDED);
    }

    /**
     * If `getLength` and `getItem` functions were provided
     */
    this._getReversedIterator = this._createReversedIterator.bind(this, reverseOrGetLength, getItem!);
  }

  /**
   * Reverses the order of the elements.
   *
   * @returns The current `Reversible` instance.
   */
  reverse() {
    this._reversed = !this._reversed;

    return this;
  }

  /**
   * Returns an iterator for the collection.
   *
   * @returns The iterator for the collection.
   */
  [Symbol.iterator]() {
    if (!this._reversed) {
      return this._iterable[Symbol.iterator]();
    }

    return this._getReversedIterator();
  }

  /**
   * Creates a reversed iterator for the collection by using getLength and getItem functions.
   *
   * @private
   *
   * @param getLength A function to get the length of the iterable.
   * @param getItem A function to get an item from the iterable by index.
   *
   * @returns The reversed iterator result.
   */
  private _createReversedIterator(getLength: (iterable: R) => number, getItem: (index: number, iterable: R) => T) {
    let index = getLength(this._iterable) - 1;

    return createIterableIterator(() => {
      if (index < 0) {
        return createIteratorReturn();
      }

      return createIteratorYield(getItem!(index--, this._iterable));
    });
  }
}
