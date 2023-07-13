import { createIteratorReturn, createIteratorYield } from '../helpers';

function arrayToReversed<T>(array: Array<T>): IterableIterator<T> {
  let index = array.length - 1;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < 0) {
        return createIteratorReturn();
      }

      return createIteratorYield(array[index--]);
    },
  };
}

export function reverse<T>(iterable: Iterable<T>): IterableIterator<T> {
  if (Array.isArray(iterable)) {
    return arrayToReversed(iterable);
  }

  const stack: T[] = [];

  for (const value of iterable) {
    stack.push(value);
  }

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (stack.length) {
        return createIteratorYield(stack.pop()!);
      }

      return createIteratorReturn();
    },
  };
}
