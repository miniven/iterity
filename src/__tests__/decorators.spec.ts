import { enumerable, enumerableAsync, tap, tapAsync } from '../decorators';
import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../jest.helpers';

describe('combiners/enumerable', () => {
  test('enumerable function creates iterator of tuples', () => {
    const collection = enumerable(['one', 'two', 'three']);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toStrictEqual([0, 'one']);
    expect(iterator.next().value).toStrictEqual([1, 'two']);
    expect(iterator.next().value).toStrictEqual([2, 'three']);
    expect(iterator.next().done).toBeTruthy();
  });

  test('enumerableAsync function creates iterator of tuples', async () => {
    const collection = enumerableAsync(createAsyncGenerator(['one', 'two', 'three']));
    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toStrictEqual([0, 'one']);
    expect(iterator.next().then(lensToYieldValue)).resolves.toStrictEqual([1, 'two']);
    expect(iterator.next().then(lensToYieldValue)).resolves.toStrictEqual([2, 'three']);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('combiners/tap', () => {
  test('tap function creates iterator and calls effect for every element', () => {
    const effect = jest.fn();
    const collection = tap((value) => effect(`value: ${value}`))(['one', 'two', 'three']);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe('one');
    expect(iterator.next().value).toBe('two');
    expect(iterator.next().value).toBe('three');
    expect(iterator.next().done).toBeTruthy();

    expect(effect).toHaveBeenNthCalledWith(1, 'value: one');
    expect(effect).toHaveBeenNthCalledWith(2, 'value: two');
    expect(effect).toHaveBeenNthCalledWith(3, 'value: three');
    expect(effect).toBeCalledTimes(3);
  });

  test('tapAsync function creates async iterator and calls effect for every element', async () => {
    const effect = jest.fn();
    const collection = tapAsync((value) => effect(`value: ${value}`))(createAsyncGenerator(['one', 'two', 'three']));
    const iterator = collection[Symbol.asyncIterator]();

    await Promise.all([
      expect(iterator.next().then(lensToYieldValue)).resolves.toBe('one'),
      expect(iterator.next().then(lensToYieldValue)).resolves.toBe('two'),
      expect(iterator.next().then(lensToYieldValue)).resolves.toBe('three'),
      expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy(),
    ]);

    expect(effect).toHaveBeenNthCalledWith(1, 'value: one');
    expect(effect).toHaveBeenNthCalledWith(2, 'value: two');
    expect(effect).toHaveBeenNthCalledWith(3, 'value: three');
    expect(effect).toBeCalledTimes(3);
  });
});
