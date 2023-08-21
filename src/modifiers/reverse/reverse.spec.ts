import { Reversible } from '../../core';
import { reverse } from './reverse';

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

  test('reverse function creates iterator effectively for string', () => {
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

  test('reverse function creates iterator for `Reversible` instance', () => {
    const collection = new Reversible(
      [1, 2, 3],
      () => 3,
      (index, iterable) => iterable[index]
    );

    const reversed = reverse(collection);
    const iterator = reversed[Symbol.iterator]();

    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBeTruthy();
  });
});
