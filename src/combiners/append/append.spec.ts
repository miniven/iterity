import { createAsyncGenerator } from '../../jest.helpers';
import { append, appendAsync } from './append';

describe('combiners/append', () => {
  test('append function creates iterator from multiple collections', () => {
    const collection = append(['3', '4'], new Set(['5', '6']))(['1', '2']);
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

  test('appendAsync function creates async iterator from multiple collections', async () => {
    const collection = appendAsync(createAsyncGenerator(['3', '4']))(createAsyncGenerator(['1', '2']));
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
