import { createAsyncGenerator } from '../../jest.helpers';
import { toArray, toArrayAsync } from './toArray';

describe('collectors/toArray', () => {
  test('toArray function returns array', () => {
    expect(toArray(new Set([1, 2, 3]))).toStrictEqual([1, 2, 3]);
    expect(toArray(new Set())).toStrictEqual([]);
    expect(toArray('iterable')).toStrictEqual(['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']);
  });

  test('toArrayAsync function returns array', async () => {
    expect(toArrayAsync(createAsyncGenerator([1, 1, 2]))).resolves.toStrictEqual([1, 1, 2]);
    expect(toArrayAsync(createAsyncGenerator([]))).resolves.toStrictEqual([]);
    expect(toArrayAsync(createAsyncGenerator('iterable'))).resolves.toStrictEqual([
      'i',
      't',
      'e',
      'r',
      'a',
      'b',
      'l',
      'e',
    ]);
  });
});
