import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core';

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

export function take(limit: number) {
  function helper<R, TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper<R, TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper<R>(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return takeAsync(limit)(iterable);
    }

    return takeSync(limit)(iterable);
  }

  return helper;
}
