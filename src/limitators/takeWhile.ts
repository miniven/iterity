import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

export function takeWhileSync<T>(predicate: (value: T) => boolean) {
  return (iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);
    let state = State.IDLE;

    return createIterableIterator(function () {
      const next = iterator.next();

      if (next.done || !predicate(next.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}

export function takeWhileAsync<T>(predicate: (value: T) => boolean) {
  return (iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);
    let state = State.IDLE;

    return createAsyncIterableIterator(async function () {
      const next = iterator.next();
      const result = await next;

      if (result.done || !predicate(result.value) || state === State.DONE) {
        state = State.DONE;

        return createIteratorReturn();
      }

      return next;
    });
  };
}

export function takeWhile<R>(predicate: (value: R) => boolean) {
  function helper<TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper<TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return takeWhileAsync(predicate)(iterable);
    }

    return takeWhileSync(predicate)(iterable);
  }

  return helper;
}
