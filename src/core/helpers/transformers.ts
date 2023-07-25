import { AsyncCollection } from '../containers/AsyncCollection';
import { Collection } from '../containers/Collection';
import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getIterableIterator,
  isAsyncIterable,
} from '.';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Creates «one-iteration» iterator over passed value
 *
 * @param value Any value
 * @returns {IterableIterator} Iterable iterator
 */
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

/**
 * Creates «one-iteration» asynchronous iterator over passed value
 *
 * @param value Any value
 * @returns {AsyncIterableIterator} Asynchronous iterable iterator
 */
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

/**
 * Makes asynchronous iterable iterator from iterable value.
 *
 * @example <caption>{ done: false, value: T } => Promise<{ done: false, value: T }></caption>
 *   const iterator = iterableToAsyncIterable([100]);
 *
 *   iterator.next(); // Promise<{ done: false, value: 100 }>
 *
 * @example <caption>{ done: false, value: Promise\<T\> } => Promise<{ done: false, value: T }></caption>
 *   const iterator = iterableToAsyncIterable([Promise.resolve(100)]);
 *
 *   iterator.next(); // Promise<{ done: false, value: 100 }>
 *
 * @param {Iterable} iterable Iterable value
 * @returns {AsyncIterableIterator} Asynchronous iterable iterator
 */
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

/**
 * Puts passed value to AsyncCollection container and returns its instance
 *
 * @example
 *   from([1, 2, 3]).switch(toAsyncCollection);
 *
 * @param value Any value
 * @returns AsyncCollection instance
 */
export function toAsyncCollection<T>(value: T | Iterable<T> | AsyncIterable<T>): AsyncCollection<T> {
  return new AsyncCollection(value);
}

/**
 * Puts passed value to Collection container and returns its instance
 *
 * @example
 *   from([1, 2, 3]).switch(toSyncCollection);
 *
 * @param value Any value
 * @returns Collection instance
 */
export function toSyncCollection<T>(value: T | Iterable<T>): Collection<T> {
  return new Collection(value);
}

/**
 * Returns passed value without any changes.
 * Used with switch method so that it could return new instance of the same collection.
 *
 * @example
 *   from([1, 2, 3]).switch(toSameContainer);
 *
 * @param value Any value
 * @returns Passed value
 */
export function toSameContainer<T>(value: T): T {
  return value;
}

/**
 * Creates new iterator over passed iterable value to make it disposable
 *
 * @param {Iterable} iterable Iterable value
 * @returns {IterableIterator} iterable iterator with "return" method implementation
 */
export function* toDisposable<T>(iterable: Iterable<T>): IterableIterator<T> {
  yield* iterable;
}

/**
 * Creates new asynchronous iterator over passed iterable value to make it disposable
 *
 * @param {AsyncIterable} iterable Async iterable value
 * @returns {AsyncIterableIterator} Asynchronous iterable iterator with "return" method implementation
 */
export async function* toDisposableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
  yield* iterable;
}

/**
 * Puts passed value to a container.
 *
 * @description AsyncCollection instance returns for values with asynchronous iterator.
 * Otherwise, Collection instance will be returned.
 *
 * @param value Any value
 * @returns Iterable collection instance
 */
export function from<T>(value: AsyncIterable<T>): AsyncCollection<T>;
export function from<T>(value: T | Iterable<T>): Collection<T>;
export function from<T>(value: T | Iterable<T> | AsyncIterable<T>): Collection<T> | AsyncCollection<T> {
  if (isAsyncIterable(value)) {
    return new AsyncCollection(value);
  }

  return new Collection(value);
}
