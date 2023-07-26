import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../jest.helpers';
import { filter, filterAsync, skip, skipAsync } from '../selectors';

describe('selectors/filter', () => {
  test('filter returns filtered iterable collection', () => {
    const moreThanThree = filter((value: number) => value > 3)([1, 2, 3, 4, 5]);
    const moreThanThreeIterator = moreThanThree[Symbol.iterator]();

    expect(moreThanThreeIterator.next().value).toBe(4);
    expect(moreThanThreeIterator.next().value).toBe(5);
    expect(moreThanThreeIterator.next().done).toBeTruthy();

    const moreThanThreeEmpty = filter((value: number) => value > 3)([]);
    const moreThanThreeEmptyIterator = moreThanThreeEmpty[Symbol.iterator]();

    expect(moreThanThreeEmptyIterator.next().done).toBeTruthy();
  });

  test('filterAsync returns filtered iterable async collection', () => {
    const moreThanThree = filterAsync((value: number) => value > 3)(createAsyncGenerator([1, 2, 3, 4, 5]));
    const moreThanThreeIterator = moreThanThree[Symbol.asyncIterator]();

    expect(moreThanThreeIterator.next().then(lensToYieldValue)).resolves.toBe(4);
    expect(moreThanThreeIterator.next().then(lensToYieldValue)).resolves.toBe(5);
    expect(moreThanThreeIterator.next().then(lensToYieldDone)).toBeTruthy();

    const moreThanThreeEmpty = filterAsync((value: number) => value > 3)(createAsyncGenerator([]));
    const moreThanThreeEmptyIterator = moreThanThreeEmpty[Symbol.asyncIterator]();

    expect(moreThanThreeEmptyIterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('selectors/skip', () => {
  test('skip returns collection of first N elements', () => {
    const first = skip(3)([1, 2, 3, 4, 5]);
    const firstIterator = first[Symbol.iterator]();

    expect(firstIterator.next().value).toBe(4);
    expect(firstIterator.next().value).toBe(5);
    expect(firstIterator.next().done).toBeTruthy();

    const second = skip(4)([]);
    const secondIterator = second[Symbol.iterator]();

    expect(secondIterator.next().done).toBeTruthy();

    const third = skip(0)([1, 2]);
    const thirdIteartor = third[Symbol.iterator]();

    expect(thirdIteartor.next().value).toBe(1);
    expect(thirdIteartor.next().value).toBe(2);
    expect(thirdIteartor.next().done).toBeTruthy();
  });

  test('skipAsync returns collection of first N elements', async () => {
    const first = skipAsync(3)(createAsyncGenerator([1, 2, 3, 4, 5]));
    const firstIterator = first[Symbol.asyncIterator]();

    await expect(firstIterator.next().then(lensToYieldValue)).resolves.toBe(4);
    await expect(firstIterator.next().then(lensToYieldValue)).resolves.toBe(5);
    await expect(firstIterator.next().then(lensToYieldDone)).resolves.toBeTruthy();

    const second = skipAsync(4)(createAsyncGenerator([]));
    const secondIterator = second[Symbol.asyncIterator]();

    expect(secondIterator.next().then(lensToYieldDone)).resolves.toBeTruthy();

    const third = skipAsync(0)(createAsyncGenerator([1, 2]));
    const thirdIteartor = third[Symbol.asyncIterator]();

    expect(thirdIteartor.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(thirdIteartor.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(thirdIteartor.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});
