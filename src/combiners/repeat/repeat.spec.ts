import { repeat } from './repeat';

describe('combiners/repeat', () => {
  test('repeat function creates repeatable iterator', () => {
    const collection = repeat(2)(['1', '2', '3']);
    const callback = jest.fn();

    for (const value of collection) {
      callback(value);
    }

    expect(callback).toHaveBeenNthCalledWith(1, '1');
    expect(callback).toHaveBeenNthCalledWith(2, '2');
    expect(callback).toHaveBeenNthCalledWith(3, '3');
    expect(callback).toHaveBeenNthCalledWith(4, '1');
    expect(callback).toHaveBeenNthCalledWith(5, '2');
    expect(callback).toHaveBeenNthCalledWith(6, '3');
    expect(callback).toBeCalledTimes(6);
  });
});
