import { Reversible } from './Reversible';

describe('core/containers/Reversible', () => {
  test('reverse method returns new iterator', () => {
    const reversible = new Reversible([1, 2, 3], (iterable) => {
      return [...iterable].reverse()[Symbol.iterator]();
    });

    const iterator = reversible[Symbol.iterator]();
    const reversedIterator = reversible.reverse()[Symbol.iterator]();

    expect(iterator).not.toStrictEqual(reversedIterator);
  });

  test('reverse method returns iterator of reversed iterable', () => {
    const reversible = new Reversible([1, 2, 3], (iterable) => {
      return [...iterable].reverse()[Symbol.iterator]();
    });

    const iterator = reversible.reverse()[Symbol.iterator]();

    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBeTruthy();
  });

  test('reverse method with getLength and getItem functions provided', () => {
    const reversible = new Reversible(
      [4, 5, 6],
      () => 3,
      (index, iterable) => iterable[index]
    );

    const iterator = reversible.reverse()[Symbol.iterator]();

    expect(iterator.next().value).toBe(6);
    expect(iterator.next().value).toBe(5);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().done).toBeTruthy();
  });

  test('reversed iterator called twice', () => {
    const collection = new Reversible(
      [4, 5, 6],
      () => 3,
      (index, iterable) => iterable[index]
    );

    const reversed = collection.reverse();
    const iterator = reversed[Symbol.iterator]();

    expect(iterator.next().value).toBe(6);
    expect(iterator.next().value).toBe(5);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().done).toBeTruthy();

    const anotherIterator = reversed[Symbol.iterator]();

    expect(anotherIterator.next().value).toBe(6);
    expect(anotherIterator.next().value).toBe(5);
    expect(anotherIterator.next().value).toBe(4);
    expect(anotherIterator.next().done).toBeTruthy();
  });
});
