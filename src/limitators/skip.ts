import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../core';

/**
 * Возвращает функцию для создания итератора, пропускающего N первых элементов
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns Функция, принимающая итерируемый объект и возвращающая итератор
 */
export function skipSync(amount: number) {
  return <T>(iterable: Iterable<T>): IterableIterator<T> => {
    const iterator = getIterableIterator(iterable);

    return createIterableIterator(function () {
      let next = iterator.next();

      while (amount && !next.done) {
        next = iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания асинхронного итератора, пропускающего N первых элементов
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns Функция, принимающая асинхронный итерируемый объект и возвращающая асинхронный итератор
 */
export function skipAsync(amount: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = await iterator.next();

      while (!next.done && amount) {
        next = await iterator.next();
        amount--;
      }

      if (next.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

/**
 * Возвращает функцию для создания синхронного или асинхронного итератора, пропускающего N первых элементов
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns Функция, принимающая итерируемый объект и возвращающая синхронный/асинхронный итератор
 */
export function skip(amount: number) {
  function helper<R, TIterable extends Iterable<R>>(iterable: TIterable): IterableIterator<R>;
  function helper<R, TIterable extends AsyncIterable<R>>(iterable: TIterable): AsyncIterableIterator<R>;
  function helper<R>(iterable: Iterable<R> | AsyncIterable<R>): IterableIterator<R> | AsyncIterableIterator<R> {
    if (isAsyncIterable(iterable)) {
      return skipAsync(amount)(iterable);
    }

    return skipSync(amount)(iterable);
  }

  return helper;
}
