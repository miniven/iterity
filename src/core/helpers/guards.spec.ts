import { isAsyncIterable, isIterable } from './guards';

describe('Guards helpers', () => {
  test('isIterable returns true for iterable values', () => {
    expect(isIterable(['1', '2', '3'])).toBeTruthy();
    expect(isIterable('123')).toBeTruthy();
    expect(isIterable(new Set())).toBeTruthy();
    expect(isIterable(new Map())).toBeTruthy();

    function* randomGenerator() {
      while (true) {
        yield Math.random();
      }
    }

    expect(isIterable(randomGenerator())).toBeTruthy();
  });

  test('isIterable returns false for non iterable values', async () => {
    expect(isIterable(1)).toBeFalsy();
    expect(isIterable({})).toBeFalsy();
    expect(isIterable(undefined)).toBeFalsy();
    expect(isIterable(null)).toBeFalsy();
  });

  test('isAsyncIterable returns true for iterable values', () => {
    async function* asyncRandomGenerator() {
      while (true) {
        yield Math.random();
      }
    }

    expect(isAsyncIterable(asyncRandomGenerator())).toBeTruthy();
  });

  test('isAsyncIterable returns false for non iterable values', async () => {
    expect(isAsyncIterable(['1', '2'])).toBeFalsy();
    expect(isAsyncIterable('123')).toBeFalsy();
    expect(isAsyncIterable(new Set())).toBeFalsy();
    expect(isAsyncIterable(new Map())).toBeFalsy();
    expect(isAsyncIterable(1)).toBeFalsy();
    expect(isAsyncIterable({})).toBeFalsy();
    expect(isAsyncIterable(undefined)).toBeFalsy();
    expect(isAsyncIterable(null)).toBeFalsy();
  });
});
