import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../helpers';

export function takeSync(limit: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      const next = iterator.next();

      limit--;

      if (next.done || limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

export function takeAsync(limit: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();

      limit--;

      if (limit < 0) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

export function take<T>(limit: number) {
  function helper(iterable: Iterable<T>): IterableIterator<T>;
  function helper(iterable: AsyncIterable<T>): AsyncIterableIterator<T>;
  function helper(iterable: Iterable<T> | AsyncIterable<T>): IterableIterator<T> | AsyncIterableIterator<T> {
    if (isAsyncIterable(iterable)) {
      return takeAsync(limit)(iterable);
    }

    return takeSync(limit)(iterable);
  }

  return helper;
}
