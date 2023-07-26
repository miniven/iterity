import { createAsyncGenerator } from '../jest.helpers';
import {
  average,
  averageAsync,
  find,
  findAsync,
  count,
  countAsync,
  first,
  firstAsync,
  join,
  joinAsync,
  last,
  lastAsync,
  max,
  maxAsync,
  min,
  minAsync,
  product,
  productAsync,
  sum,
  sumAsync,
  toArray,
  toArrayAsync,
  toSet,
  toSetAsync,
} from '../collectors';

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

describe('collectors/find', () => {
  test('find function returns correct element', () => {
    const bob = { name: 'bob' };
    const findBob = find((value: Record<'name', string>) => value.name === 'bob');

    expect(findBob([bob, { name: 'hank' }])).toBe(bob);
    expect(findBob([{ name: 'unknown' }])).toBeUndefined();
    expect(findBob([])).toBeUndefined();
    expect(findBob(new Set([bob, { name: 'hank' }]))).toBe(bob);
  });

  test('findAsync function returns correct element', async () => {
    const bob = { name: 'bob' };
    const findBob = findAsync((value: Record<'name', string>) => value.name === 'bob');

    const first = await findBob(createAsyncGenerator([]));
    const second = await findBob(createAsyncGenerator([bob, { name: 'hank' }]));
    const third = await findBob(createAsyncGenerator([{ name: 'unknown' }]));

    expect(first).toBeUndefined();
    expect(second).toBe(bob);
    expect(third).toBeUndefined();
  });
});

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

describe('collectors/join', () => {
  test('join function returns correct string', () => {
    const joinWithSlash = join('/');

    expect(joinWithSlash(['1', '2', '3'])).toBe('1/2/3');
    expect(joinWithSlash([])).toBe('');
    expect(joinWithSlash(['one'])).toBe('one');
    expect(joinWithSlash('123')).toBe('1/2/3');
    expect(joinWithSlash(new Set(['/', '/', '/']))).toBe('/');
  });

  test('joinAsync function returns correct string', async () => {
    const joinWithSlash = joinAsync('/');

    expect(joinWithSlash(createAsyncGenerator(['1', '2', '3']))).resolves.toBe('1/2/3');
    expect(joinWithSlash(createAsyncGenerator(['one']))).resolves.toBe('one');
    expect(joinWithSlash(createAsyncGenerator([]))).resolves.toBe('');
  });
});

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

describe('collectors/product', () => {
  test('product function returns product of numeric iterable collection', () => {
    expect(product([])).toBe(0);
    expect(product([1, 2, 3])).toBe(6);
    expect(product(new Set([1, 2, 3]))).toBe(6);
  });

  test('productAsync function returns product of numeric iterable async collection', async () => {
    expect(productAsync(createAsyncGenerator([1, 2, 3]))).resolves.toBe(6);
    expect(productAsync(createAsyncGenerator([]))).resolves.toBe(0);
  });
});

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
