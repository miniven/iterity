import { createAsyncGenerator } from '../../jest.helpers';
import { count, countAsync } from './count';

describe('collectors/count', () => {
  test('count function returns number of elements of an iterable collection', () => {
    expect(count([])).toBe(0);
    expect(count([1, 2, 3])).toBe(3);
    expect(count(new Set([1, 2, 3]))).toBe(3);
  });

  test('countAsync function returns number of elements of an iterable async collection', async () => {
    const first = await countAsync(createAsyncGenerator([]));
    const second = await countAsync(createAsyncGenerator([1, 2, 3]));

    expect(first).toBe(0);
    expect(second).toBe(3);
  });
});
