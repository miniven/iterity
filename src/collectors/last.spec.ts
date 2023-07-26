import { createAsyncGenerator } from '../tests/helpers';
import { last, lastAsync } from './last';

describe('collectors/last', () => {
  test('last function returns the last element', () => {
    expect(last([1])).toBe(1);
    expect(last([2, 3, 4])).toBe(4);
    expect(last([])).toBeUndefined();
  });

  test('lastAsync function returns the last element', () => {
    expect(lastAsync(createAsyncGenerator([1]))).resolves.toBe(1);
    expect(lastAsync(createAsyncGenerator([2, 3, 4]))).resolves.toBe(4);
    expect(lastAsync(createAsyncGenerator([]))).resolves.toBeUndefined();
  });
});
