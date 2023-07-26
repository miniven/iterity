import { append, appendAsync, prepend, prependAsync, repeat, sequence, sequenceAsync, zip } from '../combiners';
import { createAsyncGenerator } from '../jest.helpers';

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

describe('combiners/zip', () => {
  test('basic usage', () => {
    const collection = zip<string | number>(['one', 'two'], new Set([1, 2]));
    const iteartor = collection[Symbol.iterator]();

    expect(iteartor.next().value).toStrictEqual(['one', 1]);
    expect(iteartor.next().value).toStrictEqual(['two', 2]);
    expect(iteartor.next().done).toBeTruthy();
  });

  test('usage with nullable value', () => {
    const secondCollection = zip<string | number>(['one'], new Set([1, 2]));
    const secondIteartor = secondCollection[Symbol.iterator]();

    expect(secondIteartor.next().value).toStrictEqual(['one', 1]);
    expect(secondIteartor.next().value).toStrictEqual([null, 2]);
    expect(secondIteartor.next().done).toBeTruthy();

    const thirdCollection = zip<string | number>(['one', 'two'], new Set([1]));
    const thirdIteartor = thirdCollection[Symbol.iterator]();

    expect(thirdIteartor.next().value).toStrictEqual(['one', 1]);
    expect(thirdIteartor.next().value).toStrictEqual(['two', null]);
    expect(thirdIteartor.next().done).toBeTruthy();
  });

  test('usage with one collection passed', () => {
    const fourthCollection = zip<string | number>(['one', 'two']);
    const fourthIteartor = fourthCollection[Symbol.iterator]();

    expect(fourthIteartor.next().value).toStrictEqual(['one']);
    expect(fourthIteartor.next().value).toStrictEqual(['two']);
    expect(fourthIteartor.next().done).toBeTruthy();
  });

  test('usage with three collections passed', () => {
    const fifthCollection = zip<string | number>(['one', 'two'], [1, 2], ['1!', '2!']);
    const fifthIteartor = fifthCollection[Symbol.iterator]();

    expect(fifthIteartor.next().value).toStrictEqual(['one', 1, '1!']);
    expect(fifthIteartor.next().value).toStrictEqual(['two', 2, '2!']);
    expect(fifthIteartor.next().done).toBeTruthy();
  });

  test('usage with empty collection', () => {
    const sixthCollection = zip<string | number>([]);
    const sixthIteartor = sixthCollection[Symbol.iterator]();

    expect(sixthIteartor.next().done).toBeTruthy();
  });
});
