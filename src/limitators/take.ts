import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core/helpers';

export function take(limit: number) {
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
