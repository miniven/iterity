import { zip } from './zip';

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
