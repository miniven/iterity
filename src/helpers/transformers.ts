import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getIterableIterator,
} from '.';
import { AsyncCollection } from '../core/containers/AsyncCollection';
import { Collection } from '../core/containers/Collection';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

export function toIterableValue<T>(value: T): IterableIterator<T> {
  let state = State.IDLE;

  return createIterableIterator(function () {
    if (state === State.DONE) {
      return createIteratorReturn();
    }

    state = State.DONE;

    return createIteratorYield(value);
  });
}

export function toAsyncIterableValue<T>(value: T): AsyncIterableIterator<T> {
  let state = State.IDLE;

  return createAsyncIterableIterator(async function () {
    if (state === State.DONE) {
      return createIteratorReturn();
    }

    state = State.DONE;

    return createIteratorYield(value);
  });
}

export function iterableToAsyncIterable<T>(iterable: Iterable<T>): AsyncIterableIterator<T> {
  const iterator = getIterableIterator(iterable);

  return createAsyncIterableIterator(async function () {
    const next = iterator.next();

    if (!next.done) {
      return createIteratorYield(next.value instanceof Promise ? await next.value : next.value);
    }

    return createIteratorReturn();
  });
}

export function toAsyncCollection<T>(value: T | Iterable<T> | AsyncIterable<T>): AsyncCollection<T> {
  return new AsyncCollection(value);
}

export function toCollection<T>(value: T | Iterable<T>): Collection<T> {
  return new Collection(value);
}

export function toSameContainer<T>(value: T): T {
  return value;
}
