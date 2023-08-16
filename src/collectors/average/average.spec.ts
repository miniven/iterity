import { createAsyncGenerator } from '../../jest.helpers';
import { average, averageAsync } from './average';

describe('collectors/average', () => {
  test('average function returns average value of numeric iterable collection', () => {
    expect(average([])).toBe(0);
    expect(average([1, 2, 3])).toBe(2);
    expect(average(new Set([1, 2, 3]))).toBe(2);
  });

  test('averageAsync function returns average of numeric iterable async collection', async () => {
    const first = await averageAsync(createAsyncGenerator([1, 2, 3]));
    const second = await averageAsync(createAsyncGenerator([]));

    expect(first).toBe(2);
    expect(second).toBe(0);
  });
});
