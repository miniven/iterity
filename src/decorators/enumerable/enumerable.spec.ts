import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../../jest.helpers';
import { enumerable, enumerableAsync } from './enumerable';

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
