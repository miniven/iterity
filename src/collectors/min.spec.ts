import { createAsyncGenerator } from '../tests/helpers';
import { min, minAsync } from './min';

describe('collectors/min', () => {
  test('min function returns the minimum element', () => {
    expect(min([1])).toBe(1);
    expect(min([2, 100, 4])).toBe(2);
    expect(min([2, -100, 4])).toBe(-100);
    expect(min([])).toBeUndefined();
  });

  test('minAsync function returns the minimum element', () => {
    expect(minAsync(createAsyncGenerator([1]))).resolves.toBe(1);
    expect(minAsync(createAsyncGenerator([2, 100, 4]))).resolves.toBe(2);
    expect(minAsync(createAsyncGenerator([2, -100, 4]))).resolves.toBe(-100);
    expect(minAsync(createAsyncGenerator([]))).resolves.toBeUndefined();
  });
});
