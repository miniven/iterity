import { createAsyncGenerator } from '../../jest.helpers';
import { first, firstAsync } from './first';

describe('collectors/first', () => {
  test('first function returns the first element', () => {
    expect(first([1])).toBe(1);
    expect(first([2, 3, 4])).toBe(2);
    expect(first([])).toBeUndefined();
  });

  test('firstAsync function returns the first element', () => {
    expect(firstAsync(createAsyncGenerator([1]))).resolves.toBe(1);
    expect(firstAsync(createAsyncGenerator([2, 3, 4]))).resolves.toBe(2);
    expect(firstAsync(createAsyncGenerator([]))).resolves.toBeUndefined();
  });
});
