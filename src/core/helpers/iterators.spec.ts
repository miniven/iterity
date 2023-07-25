import { AsyncCollection } from '../containers/AsyncCollection';
import { forEach, forEachAsync } from './iterators';

describe('Iterators helpers', () => {
  test('forEach calls for every value of iterable collection', () => {
    const collection = new Set(['one', 'two', 'three']);
    const callback = jest.fn();

    forEach(collection, callback);

    expect(callback).toHaveBeenNthCalledWith(1, 'one', collection);
    expect(callback).toHaveBeenNthCalledWith(2, 'two', collection);
    expect(callback).toHaveBeenNthCalledWith(3, 'three', collection);
  });

  test('forEachAsync calls for every value of async iterable collection', async () => {
    const collection = new AsyncCollection(['one', 'two', 'three']);
    const callback = jest.fn();

    await forEachAsync(collection, callback);

    expect(callback).toHaveBeenNthCalledWith(1, 'one', collection);
    expect(callback).toHaveBeenNthCalledWith(2, 'two', collection);
    expect(callback).toHaveBeenNthCalledWith(3, 'three', collection);
  });
});
