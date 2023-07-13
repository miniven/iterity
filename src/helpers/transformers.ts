import { createIteratorReturn, createIteratorYield } from '.';
import { Disposable } from '../core/containers/Disposable';
import { Resumable } from '../core/containers/Resumable';

const enum State {
  IDLE = 'IDLE',
  DONE = 'DONE',
}

export function toIterableValue<T>(value: T): IterableIterator<T> {
  let state = State.IDLE;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (state === State.DONE) {
        return createIteratorReturn();
      }

      state = State.DONE;

      return createIteratorYield(value);
    },
  };
}

export function toDisposable<T>(value: T | Iterable<T>): Disposable<T> {
  return new Disposable(value);
}

export function toResumable<T>(value: T | Iterable<T>): Resumable<T> {
  return new Resumable(value);
}

export function toSameContainer<T>(value: T): T {
  return value;
}
