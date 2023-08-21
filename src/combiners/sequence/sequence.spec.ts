import { createAsyncGenerator } from '../../jest.helpers';
import { sequence, sequenceAsync } from './sequence';

describe('combiners/sequence', () => {
  test('sequence function creates iterator from multiple collections', () => {
    const collection = sequence(['100'], new Set(['200', '300']));
    const callback = jest.fn();

    for (const value of collection) {
      callback(value);
    }

    expect(callback).toHaveBeenNthCalledWith(1, '100');
    expect(callback).toHaveBeenNthCalledWith(2, '200');
    expect(callback).toHaveBeenNthCalledWith(3, '300');
    expect(callback).toBeCalledTimes(3);

    const anotherCollection = sequence(['400']);
    const anotherCallback = jest.fn();

    for (const value of anotherCollection) {
      anotherCallback(value);
    }

    expect(anotherCallback).toHaveBeenNthCalledWith(1, '400');
    expect(anotherCallback).toBeCalledTimes(1);
  });

  test('sequenceAsync function creates async iterator from multiple collections', async () => {
    const collection = sequenceAsync(createAsyncGenerator(['100']), createAsyncGenerator(['200', '300']));
    const callback = jest.fn();

    for await (const value of collection) {
      callback(value);
    }

    expect(callback).toHaveBeenNthCalledWith(1, '100');
    expect(callback).toHaveBeenNthCalledWith(2, '200');
    expect(callback).toHaveBeenNthCalledWith(3, '300');
    expect(callback).toBeCalledTimes(3);

    const anotherCollection = sequenceAsync(createAsyncGenerator(['400']));
    const anotherCallback = jest.fn();

    for await (const value of anotherCollection) {
      anotherCallback(value);
    }

    expect(anotherCallback).toHaveBeenNthCalledWith(1, '400');
    expect(anotherCallback).toBeCalledTimes(1);
  });
});
