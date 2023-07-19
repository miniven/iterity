export const createIteratorYield = <T>(value: T): IteratorYieldResult<T> => ({
  done: false,
  value,
});

export const createIteratorReturn = (): IteratorReturnResult<undefined> => ({
  done: true,
  value: undefined,
});

export function createAsyncIterableIterator<T>(next: AsyncIterator<T>['next']): AsyncIterableIterator<T> {
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next,
  };
}

export function createIterableIterator<T>(next: Iterator<T>['next']): IterableIterator<T> {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next,
  };
}
