import { Disposable } from '../containers/Disposable';
import { Resumable } from '../containers/Resumable';

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
        return { done: true, value: undefined };
      }

      state = State.DONE;

      return { done: false, value };
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
