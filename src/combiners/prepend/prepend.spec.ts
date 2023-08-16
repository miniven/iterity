import { createAsyncGenerator } from '../../jest.helpers';
import { prepend, prependAsync } from './prepend';

describe('combiners/prepend', () => {
  test('prepend function creates iterator from multiple collections', () => {
    const collection = prepend(['1', '2'], new Set(['3', '4']))(['5', '6']);
    const callback = jest.fn();

    for (const value of collection) {
      callback(value);
    }

    expect(callback).toHaveBeenNthCalledWith(1, '1');
    expect(callback).toHaveBeenNthCalledWith(2, '2');
    expect(callback).toHaveBeenNthCalledWith(3, '3');
    expect(callback).toHaveBeenNthCalledWith(4, '4');
    expect(callback).toHaveBeenNthCalledWith(5, '5');
    expect(callback).toHaveBeenNthCalledWith(6, '6');
    expect(callback).toBeCalledTimes(6);
  });

  test('prependAsync function creates async iterator from multiple collections', async () => {
    const collection = prependAsync(createAsyncGenerator(['1', '2']))(createAsyncGenerator(['3', '4']));
    const callback = jest.fn();

    for await (const value of collection) {
      callback(value);
    }

    expect(callback).toHaveBeenNthCalledWith(1, '1');
    expect(callback).toHaveBeenNthCalledWith(2, '2');
    expect(callback).toHaveBeenNthCalledWith(3, '3');
    expect(callback).toHaveBeenNthCalledWith(4, '4');
    expect(callback).toBeCalledTimes(4);
  });
});
