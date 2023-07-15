import { AsyncCollection } from '../core/containers/AsyncCollection';
import { Collection } from '../core/containers/Collection';
import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
} from '.';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

/**
 * Принимает любое значение и приводит его к итератору с одной итерацией, на которой будет отдано это значение.
 *
 * @param value Обычное значение, которое будет помещено в контекст итератора
 * @returns {IterableIterator} Асинхронный итератор
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
 * Принимает любое значение и приводит его к асинхронному итератору с одной итерацией, на которой будет отдано это значение.
 *
 * @param value Обычное значение, которое будет помещено в контекст итератора
 * @returns {AsyncIterableIterator} Асинхронный итератор
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
 * Приведение итерируемой коллекции к асинхронному итератору.
 *
 * @description Работает так, что если в коллекции есть промис, то в IteratorYieldResult попадёт значение, которое он отдаст.
 * А сам объект IteratorYieldResult будет являться промисом, как и предполагает асинхронный итератор.
 * Наглядно: { done: false, value: Promise<T> } => Promise<{ done: false, value: T }>
 *
 * @param {Iterable} iterable Итерируемая коллекция
 * @returns {AsyncIterableIterator} Асинхронный итератор
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
 * Приведение асинхронной итерируемой коллекции к синхронному итератору.
 *
 * @description Наглядно: Promise<{ done: false, value: T }> => { done: false, value: Promise<T> }
 *
 * @param {AsyncIterable} iterable Асинхронная итерируемая коллекция
 * @returns {IterableIterator} Итератор
 */
// export function asyncIterableToIterable<T>(iterable: AsyncIterable<T>): IterableIterator<Promise<T>> {
//   const iterator = getAsyncIterableIterator(iterable);

//   return createIterableIterator(function () {
//     const next = iterator.next();

//     if (!next.done) {
//       return createIteratorYield(next.then(iteratorYield => iteratorYield.value));
//     }

//     return createIteratorReturn();
//   });
// }

/**
 * Помещает значение в контейнер для работы с асинхронной коллекцией
 *
 * @param value Любое значение, включая итерируемые коллекции
 * @returns Контейнер асинхронной коллекции
 */
export function toAsyncCollection<T>(value: T | Iterable<T> | AsyncIterable<T>): AsyncCollection<T> {
  return new AsyncCollection(value);
}

/**
 * Помещает значение в контейнер для работы с синхронной коллекцией
 *
 * @param value Любое значение, включая итерируемые коллекции
 * @returns Контейнер коллекции
 */
export function toCollection<T>(value: T | Iterable<T>): Collection<T> {
  return new Collection(value);
}

/**
 * Возвращает значение как оно есть, чтобы метод transform у контейнера поместил его в контейнер того же типа
 *
 * @param value Любое значение, которое будет помещено в новый контейнер
 * @returns То же самое значение
 */
export function toSameContainer<T>(value: T): T {
  return value;
}

export function* toDisposable<T>(iterable: Iterable<T>): IterableIterator<T> {
  yield* iterable;
}

export async function* toDisposableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
  yield* iterable;
}
