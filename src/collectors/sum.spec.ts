import { createAsyncGenerator } from '../tests/helpers';
import { sum, sumAsync } from './sum';

describe('collectors/sum', () => {
  test('sum function returns sum of numeric iterable collection', () => {
    expect(sum([])).toBe(0);
    expect(sum([1, 1, 2])).toBe(4);
    expect(sum(new Set([1, 2, 1]))).toBe(3);
  });

  test('sumAsync function returns sum of numeric iterable async collection', async () => {
    expect(sumAsync(createAsyncGenerator([1, 1, 2]))).resolves.toBe(4);
    expect(sumAsync(createAsyncGenerator([]))).resolves.toBe(0);
  });
});
