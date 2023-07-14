export { toResumable, toDisposable, toSameContainer, toIterableValue } from './transformers';

export function isIterable<T>(value: any): value is Iterable<T> {
  return typeof value[Symbol.iterator] === 'function';
}

export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return typeof value[Symbol.asyncIterator] === 'function';
}

export const createIteratorYield = <T>(value: T): IteratorYieldResult<T> => ({
  done: false,
  value,
});

export const createIteratorReturn = (): IteratorReturnResult<undefined> => ({
  done: true,
  value: undefined,
});

export function getIterator<T>(value: Iterable<T>): Iterator<T> {
  return value[Symbol.iterator]();
}

export function getIterableIterator<T>(value: Iterable<T>): IterableIterator<T> {
  const iterator = value[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}

export function getAsyncIterableIterator<T>(value: AsyncIterable<T>): AsyncIterableIterator<T> {
  const iterator = value[Symbol.asyncIterator]();

  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return iterator.next();
    },
  };
}

// type TFunc<Args extends any[], R> = (...args: Args) => R;

// export function curry<F extends TFunc<any[], any>>(fn: F) {
//   function helper<T>(this: T, ...args: any[]): ReturnType<F> {
//     if (args.length >= fn.length) {
//       return fn.apply(this, args);
//     }

//     return helper.bind(this, ...args) as ReturnType<F>;
//   }

//   return helper;
// }
