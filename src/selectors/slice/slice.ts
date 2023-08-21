import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
} from '../../core';

/**
 * Creates iterator for a specific range of values of original iterable value
 *
 * @example
 *   from([1, 2, 3, 4, 5]).pipe(slice(1, 4)); // [2, 3, 4]
 *
 * @param from Range start index. An element with this index is included in the range.
 * @param to Range end index. An element with this index is NOT included in the range.
 * @returns Function which accepts the target collection and creates new iterable iterator
 */
export function slice(from: number, to: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let pointer = 0;

    return createIterableIterator(function () {
      let next = iterator.next();

      while (pointer < from && !next.done) {
        next = iterator.next();
        pointer++;
      }

      if (next.done || pointer >= to) {
        return createIteratorReturn();
      }

      pointer++;

      return next;
    });
  };
}

/**
 * Creates asynchronous iterator for a specific range of values of original iterable value
 *
 * @example
 *   new AsyncCollection([1, 2, 3, 4, 5]).pipe(sliceAsync(1, 4)); // Promise {[2, 3, 4]}
 *
 * @param from Range start index. An element with this index is included in the range.
 * @param to Range end index. An element with this index is NOT included in the range.
 * @returns Function which accepts the target collection and creates new asynchronous iterable iterator
 */
export function sliceAsync(from: number, to: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let pointer = 0;

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && pointer < from) {
        next = await iterator.next();
        pointer++;
      }

      if (next.done || pointer >= to) {
        return createIteratorReturn();
      }

      pointer++;

      return next;
    });
  };
}
