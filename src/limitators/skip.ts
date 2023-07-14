import {
  createAsyncIterableIterator,
  createIterableIterator,
  createIteratorReturn,
  getAsyncIterableIterator,
  getIterableIterator,
  isAsyncIterable,
} from '../helpers';

/**
 *
 * @param amount Количество элементов, которые нужно пропустить
 * @returns
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

export function skipAsync(amount: number) {
  return <T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T> => {
    const iterator = getAsyncIterableIterator(iterable);

    return createAsyncIterableIterator(async function () {
      let next = iterator.next();

      /**
       * Пропускаем первый элемент, но это не значит, что не придётся его ждать.
       * В асинхронных итераторах данные появляются асинхронно.
       */
      while (amount) {
        next = iterator.next();
        amount--;
      }

      const result = await next;

      if (result.done) {
        return createIteratorReturn();
      }

      return next;
    });
  };
}

export function skip(amount: number) {
  function helper<T>(iterable: Iterable<T>): IterableIterator<T>;
  function helper<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<T>;
  function helper<T>(iterable: Iterable<T> | AsyncIterable<T>): IterableIterator<T> | AsyncIterableIterator<T> {
    if (isAsyncIterable(iterable)) {
      return skipAsync(amount)(iterable);
    }

    return skipSync(amount)(iterable);
  }

  return helper;
}
