import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../jest.helpers';
import { reverse, map, mapAsync } from '../modifiers';

describe('modifiers/map', () => {
  test('map function returns iterator with changed values', () => {
    const collection = map((value: number) => value * 2)([1, 2, 3]);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().value).toBe(6);
    expect(iterator.next().done).toBeTruthy();
  });

  test('mapAsync function returns async iterator with changed values', () => {
    const collection = mapAsync((value: number) => value * 2)(createAsyncGenerator([1, 2, 3]));
    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(4);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(6);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('modifiers/reverse', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reverse function creates iterator effectively for array', () => {
    const arr = [1, 2, 3];
    const iteratorFunctionMock = jest.spyOn(arr, Symbol.iterator);
    const collection = reverse(arr);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBeTruthy();
    expect(iteratorFunctionMock).not.toBeCalled();
  });

  test('reverse function creates iterator effectively for array', () => {
    const iteratorFunctionMock = jest.spyOn(String.prototype, Symbol.iterator);

    const collection = reverse('123');
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe('3');
    expect(iterator.next().value).toBe('2');
    expect(iterator.next().value).toBe('1');
    expect(iterator.next().done).toBeTruthy();
    expect(iteratorFunctionMock).not.toBeCalled();
  });

  test('reverse function creates iterator by iterating through original collection', () => {
    const set = new Set(['1', '2', '3']);
    const iteratorFunctionMock = jest.spyOn(set, Symbol.iterator);
    const collection = reverse(set);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe('3');
    expect(iterator.next().value).toBe('2');
    expect(iterator.next().value).toBe('1');
    expect(iterator.next().done).toBeTruthy();
    expect(iteratorFunctionMock).toBeCalled();
  });
});
