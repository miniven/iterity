function arrayToReversed<T>(array: Array<T>): IterableIterator<T> {
  let index = array.length - 1;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < 0) {
        return { done: true, value: undefined };
      }

      return { done: false, value: array[index--] };
    },
  };
}

export function reverse<T>(iterable: Iterable<T>): IterableIterator<T> {
  console.log(iterable);

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
        return { done: false, value: stack.pop()! };
      }

      return { done: true, value: undefined };
    },
  };
}
