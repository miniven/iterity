import { createAsyncGenerator } from '../tests/helpers';
import { toSet, toSetAsync } from './toSet';

describe('collectors/toSet', () => {
  test('toSet function returns new Set', () => {
    expect(toSet([1, 2, 3])).toStrictEqual(new Set([1, 2, 3]));
    expect(toSet([1, 1, 1, 2])).toStrictEqual(new Set([1, 2]));
    expect(toSet([])).toStrictEqual(new Set());
    expect(toSet('iterable')).toStrictEqual(new Set(['i', 't', 'e', 'r', 'a', 'b', 'l', 'e']));
  });

  test('toSetAsync function returns new Set', async () => {
    expect(toSetAsync(createAsyncGenerator([1, 1, 2]))).resolves.toStrictEqual(new Set([1, 2]));
    expect(toSetAsync(createAsyncGenerator([]))).resolves.toStrictEqual(new Set());
    expect(toSetAsync(createAsyncGenerator('iterable'))).resolves.toStrictEqual(
      new Set(['i', 't', 'e', 'r', 'a', 'b', 'l', 'e'])
    );
  });
});
