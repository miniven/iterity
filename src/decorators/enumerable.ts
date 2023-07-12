import { getIterator } from '../core/helpers';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

export function enumerable<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  const iterator = getIterator(iterable);

  let index = 0;
  let state = State.IDLE;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = iterator.next();

      if (done || state === State.DONE) {
        return {
          value: undefined,
          done: true,
        };
      }

      return {
        value: [index++, value],
        done: false,
      };
    },
  };
}
