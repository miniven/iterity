import { AsyncCollection } from '../containers/AsyncCollection';
import { Collection } from '../containers/Collection';
import {
  from,
  iterableToAsyncIterable,
  toAsyncCollection,
  toAsyncIterableValue,
  toIterableValue,
  toSameContainer,
} from './transformers';

const lensToYieldValue = <T>(data: { value: T }) => data.value;
const lensToYieldDone = (data: { done?: boolean }) => data.done;

describe('Transformers helpers: toIterableValue', () => {
  test('function returns iterable for primitive value', () => {
    const iterable = toIterableValue(1);

    expect(iterable).toHaveProperty([Symbol.iterator]);
    expect(iterable.next().value).toBe(1);
    expect(iterable.next().done).toBeTruthy();
  });

  test('function returns iterable for iterable value', () => {
    const iterable = toIterableValue(['1', '2']);

    expect(iterable).toHaveProperty([Symbol.iterator]);
    expect(iterable.next().value).toHaveProperty([Symbol.iterator]);
    expect(iterable.next().done).toBeTruthy();
  });
});

describe('Transformers helpers: toAsyncIterableValue', () => {
  test('function returns async iterable for primitive value', () => {
    const iterable = toAsyncIterableValue(1);

    expect(iterable).toHaveProperty([Symbol.asyncIterator]);
    expect(iterable.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterable.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('Transformers helpers: iterableToAsyncIterable', () => {
  test('function returns async iterator of primitives for iterable of primitives', () => {
    const iterable = iterableToAsyncIterable([1, 2]);

    expect(iterable).toHaveProperty([Symbol.asyncIterator]);
    expect(iterable.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterable.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterable.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });

  test('function returns async iterator of primitives for iterable of promises', () => {
    const iterable = iterableToAsyncIterable([Promise.resolve(1), Promise.resolve(2)]);

    expect(iterable).toHaveProperty([Symbol.asyncIterator]);
    expect(iterable.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterable.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterable.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('Transformers helpers: toAsyncCollection', () => {
  test('returns AsyncCollection instance', () => {
    const collection = toAsyncCollection([1, 2]);

    expect(collection).toHaveProperty([Symbol.asyncIterator]);
    expect(collection).toBeInstanceOf(AsyncCollection);
  });

  test('returns AsyncCollection instance when used with "switch" method', () => {
    const collection = new Collection([1, 2]).switch(toAsyncCollection);

    expect(collection).toHaveProperty([Symbol.asyncIterator]);
    expect(collection).toBeInstanceOf(AsyncCollection);
  });
});

describe('Transformers helpers: toSameContainer', () => {
  test('returns Collection instance', () => {
    const collection = new Collection([1, 2]).switch(toSameContainer);

    expect(collection).toHaveProperty([Symbol.iterator]);
    expect(collection).toBeInstanceOf(Collection);
  });

  test('returns AsyncCollection instance', () => {
    const collection = new AsyncCollection([1, 2]).switch(toSameContainer);

    expect(collection).toHaveProperty([Symbol.asyncIterator]);
    expect(collection).toBeInstanceOf(AsyncCollection);
  });
});

describe('Transformers helpers: from', () => {
  test('returns Collection instance', () => {
    const collection = from([1, 2]);

    expect(collection).toHaveProperty([Symbol.iterator]);
    expect(collection).toBeInstanceOf(Collection);
  });

  test('returns Collection instance for non iterable values', () => {
    const collection = from({ name: 'Hank', lastname: 'Hill' });

    expect(collection).toHaveProperty([Symbol.iterator]);
    expect(collection).toBeInstanceOf(Collection);
  });

  test('returns AsyncCollection instance', () => {
    async function* randomAsyncGenerator() {
      while (true) {
        yield Math.random();
      }
    }

    const collection = from(randomAsyncGenerator());

    expect(collection).toHaveProperty([Symbol.asyncIterator]);
    expect(collection).toBeInstanceOf(AsyncCollection);
  });
});
