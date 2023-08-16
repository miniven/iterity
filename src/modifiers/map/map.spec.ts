import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../../jest.helpers';
import { map, mapAsync } from './map';

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
