/**
 * Creates iterator yield result object: { done: false, value }
 *
 * @param value Yield value
 * @returns Iterator yield result object
 */
export const createIteratorYield = <T>(value: T): IteratorYieldResult<T> => ({
  done: false,
  value,
});

/**
 * Creates iterator return result object: { done: true, value: undefined }
 *
 * @returns Iterator return result object
 */
export const createIteratorReturn = (): IteratorReturnResult<undefined> => ({
  done: true,
  value: undefined,
});

/**
 * Creates new asynchronous iterator with passed function as next method.
 *
 * @param next Async function used as next method
 * @param [returnMethod] Function used as return method
 * @returns Asyncronous iterator
 */
export function createAsyncIterableIterator<T>(
  next: AsyncIterator<T>['next'],
  returnMethod?: AsyncIterator<T>['return']
): AsyncIterableIterator<T> {
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next,
    return: returnMethod,
  };
}

/**
 * Creates new iterator with passed function as next method
 *
 * @param next Function used as next method
 * @param [returnMethod] Function used as return method
 * @returns Iterator
 */
export function createIterableIterator<T>(
  next: Iterator<T>['next'],
  returnMethod?: Iterator<T>['return']
): IterableIterator<T> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next,
    return: returnMethod,
  };
}
