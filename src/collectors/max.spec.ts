import { createAsyncGenerator } from '../tests/helpers';
import { max, maxAsync } from './max';

describe('collectors/max', () => {
  test('max function returns the maximum element', () => {
    expect(max([1])).toBe(1);
    expect(max([2, 100, 4])).toBe(100);
    expect(max([2, -100, 4])).toBe(4);
    expect(max([])).toBeUndefined();
  });

  test('maxAsync function returns the maximum element', () => {
    expect(maxAsync(createAsyncGenerator([1]))).resolves.toBe(1);
    expect(maxAsync(createAsyncGenerator([2, 100, 4]))).resolves.toBe(100);
    expect(maxAsync(createAsyncGenerator([2, -100, 4]))).resolves.toBe(4);
    expect(maxAsync(createAsyncGenerator([]))).resolves.toBeUndefined();
  });
});
