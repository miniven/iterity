import { randomAsyncGenerator, randomGenerator } from '../../jest.helpers';
import { isAsyncIterable, isIterable } from './guards';

describe('core/helpers/guards', () => {
  test('isIterable returns true for iterable values', () => {
    expect(isIterable(['1', '2', '3'])).toBeTruthy();
    expect(isIterable('123')).toBeTruthy();
    expect(isIterable(new Set())).toBeTruthy();
    expect(isIterable(new Map())).toBeTruthy();
    expect(isIterable(randomGenerator())).toBeTruthy();
  });

  test('isIterable returns false for non iterable values', async () => {
    expect(isIterable(1)).toBeFalsy();
    expect(isIterable({})).toBeFalsy();
    expect(isIterable(undefined)).toBeFalsy();
    expect(isIterable(null)).toBeFalsy();
  });

  test('isAsyncIterable returns true for iterable values', () => {
    expect(isAsyncIterable(randomAsyncGenerator())).toBeTruthy();
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
