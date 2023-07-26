import { randomAsyncGenerator } from '../../jest.helpers';
import { getAsyncIterableIterator, getIterableIterator } from './getters';

describe('core/helpers/getters', () => {
  test('getIterableIterator returns new iterable iterator', () => {
    const collection = [1, 2, 3];
    const iterator = getIterableIterator(collection);

    expect(iterator).toHaveProperty([Symbol.iterator]);
    expect(iterator).toHaveProperty('next');
    expect(iterator[Symbol.iterator]()).toBe(iterator);
  });

  test('getAsyncIterableIterator returns new async iterable iterator', () => {
    const iterator = getAsyncIterableIterator(randomAsyncGenerator());

    expect(iterator).toHaveProperty([Symbol.asyncIterator]);
    expect(iterator).toHaveProperty('next');
    expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
  });
});
