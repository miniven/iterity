import { AsyncCollection } from '../containers/AsyncCollection';
import { Collection } from '../containers/Collection';
import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '.';
import { IterableIteratorSpecified } from '../types';

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
 * @description Особенность функции в том, что при значение done хранится внутри промиса, а мы не дожидаемся его окончания.
 * Поэтому остановкой итератора придётся управлять вручную, передав в очередной вызов iterator.next() аргумент true, если итератору завершён.
 *
 * Наглядно: Promise<{ done: false, value: T }> => { done: false, value: Promise<T> }
 *
 * @param {AsyncIterable} iterable Асинхронная итерируемая коллекция
 * @param {Number} iterationsCount Количество итераций, чтобы итератор мог понять, когда завершиться
 * @returns {IterableIterator} Итератор
 */
export function asyncIterableToIterable<T>(
  iterable: AsyncIterable<T>,
  iterationsCount: number = Infinity
): IterableIteratorSpecified<Promise<T>, undefined, boolean | void> {
  const iterator = getAsyncIterableIterator(iterable);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next(done: boolean) {
      const next = iterator.next();

      if (!done && iterationsCount > 0) {
        iterationsCount--;
        return createIteratorYield(next.then((iteratorYield) => iteratorYield.value));
      }

      return createIteratorReturn();
    },
  };
}

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
export function toSyncCollection<T>(value: T | Iterable<T> | AsyncCollection<T>): Collection<T> {
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

/**
 * Преобразует итератор коллекции к невозобновляемому типу
 *
 * @param {Iterable} iterable Итерируемой объект
 * @returns {IterableIterator} Итерируемый объект, итератор которого реализует метод return
 */
export function* toDisposable<T>(iterable: Iterable<T>): IterableIterator<T> {
  yield* iterable;
}

/**
 * Преобразует асинхронный итератор коллекции к невозобновляемому типу
 *
 * @param {Iterable} iterable Итерируемой объект
 * @returns {IterableIterator} Итерируемый объект, асинхронный итератор которого реализует метод return
 */
export async function* toDisposableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> {
  yield* iterable;
}

/**
 * Помещает переданное значение в контейнер.
 *
 * @description Если передан асинхронный итератор, то будет возвращён экземпляр AsyncCollection.
 * Если передаётся любое другое значение, то возвращается экземпляр Collection.ы
 *
 * @param value Значение, которое будет помещено в итерируемый контейнер
 * @returns Итерируемый экземпляр контейнера
 */
export function from<T>(value: AsyncIterable<T>): AsyncCollection<T>;
export function from<T>(value: T | Iterable<T>): Collection<T>;
export function from<T>(value: T | Iterable<T> | AsyncIterable<T>): Collection<T> | AsyncCollection<T> {
  if (isAsyncIterable(value)) {
    return new AsyncCollection(value);
  }

  return new Collection(value);
}
