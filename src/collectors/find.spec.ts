import { createAsyncGenerator } from '../tests/helpers';
import { find, findAsync } from './find';

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
