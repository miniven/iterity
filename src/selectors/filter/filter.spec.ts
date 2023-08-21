import { createAsyncGenerator, lensToYieldDone, lensToYieldValue } from '../../jest.helpers';
import { filter, filterAsync } from './filter';

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
