import { randomAsyncGenerator } from '../../jest.helpers';
import { enumerable } from '../../decorators';
import { take } from '../../selectors';
import { Collection } from './Collection';

describe('core/containers/Collection: base iterator', () => {
  /**
   * Примитивное значение внутри контейнера становится итерируемым
   */
  test('primitive value becomes iterable', () => {
    const collection = new Collection(1);

    expect(collection).toHaveProperty([Symbol.iterator]);

    for (const value of collection) {
      expect(value).toBe(1);
    }
  });

  /**
   * Коллекция на основе массива итерируется по элементам массива
   */
  test('iterable array in collection stays as it is', () => {
    const collection = new Collection([1, 2]);
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().done).toBeTruthy();
  });

  /**
   * Коллекция на основе Set'а итерируется по элементам Set'а
   */
  test('iterable Set in collection stays as it is', () => {
    const collection = new Collection(new Set([1, 2]));
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('core/containers/Collection: pipe method', () => {
  /**
   * Метод pipe добавляет итератор поверх оригинального значения
   */
  test('adds iterator over original value', () => {
    const multiplyByTwo = (value: number) => value * 2;
    const collection = new Collection([1, 2, 3]).pipe((iterable) => {
      const iterator = iterable[Symbol.iterator]();

      return {
        [Symbol.iterator]() {
          return {
            next() {
              const next = iterator.next();

              if (next.done) {
                return next;
              }

              return { done: false, value: multiplyByTwo(next.value) };
            },
          };
        },
      };
    });

    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toBe(2);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().value).toBe(6);
    expect(iterator.next().done).toBeTruthy();
  });

  /**
   * Метод pipe создаёт композицию из нескольких итераторов поверх оригинального значения
   */
  test('composes multiple iterators over original value', () => {
    const collection = new Collection(['1', '2', '3']).pipe(enumerable, take(2));
    const iterator = collection[Symbol.iterator]();

    expect(iterator.next().value).toStrictEqual([0, '1']);
    expect(iterator.next().value).toStrictEqual([1, '2']);
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('core/containers/Collection: collect method', () => {
  /**
   * Метод collect возвращает значение, возвращенное из функции, не трогая оригинальный экземпляр класса
   */
  test('returns same value as collector without changing original class instance', () => {
    const collection = new Collection([1, 2]);

    expect(collection).toBeInstanceOf(Collection);

    const value = collection.collect((iterable) => {
      let sum = 0;

      for (const value of iterable) {
        sum += value;
      }

      return sum;
    });

    expect(collection).toBeInstanceOf(Collection);
    expect(value).toBe(3);
  });

  /**
   * Метод collect возвращает экземпляр того же класса, если это было явно указано в функции
   * При этом это должны быть разные экземпляры
   */
  test('returns instance of the same container if it was specified', () => {
    const collection = new Collection([1, 2]);

    expect(collection).toBeInstanceOf(Collection);

    const value = collection.collect((iterable) => new Collection(iterable));

    expect(collection).toBeInstanceOf(Collection);
    expect(value).toBeInstanceOf(Collection);
    expect(collection).not.toBe(value);
  });
});

describe('core/containers/Collection: switch method', () => {
  /**
   * Возвращает новый экземпляр того же класса, не трогая оригинальный экземпляр
   */
  test('returns instance of the same container without changing original instance', () => {
    const collection = new Collection([1, 2]);

    expect(collection).toBeInstanceOf(Collection);

    const nextCollection = collection.switch(() => 1);

    expect(collection).toBeInstanceOf(Collection);
    expect(nextCollection).toBeInstanceOf(Collection);
    expect(collection).not.toBe(nextCollection);
  });

  /**
   * Возвращает новый экземпляр того же класса, если функция возвращает не экземпляр класса, а примитив
   */
  test("returns instance of the same container with returned value if switcher doesn't return collection instance", () => {
    const collection = new Collection([1, 2]);
    const nextCollection = collection.switch(() => 1);
    const iterator = nextCollection[Symbol.iterator]();

    expect(nextCollection).toBeInstanceOf(Collection);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().done).toBeTruthy();
  });

  /**
   * Возвращает экземпляр класса, если функция его возвращает
   */
  test('returns instance of container if switcher returns collection instance', () => {
    const collection = new Collection([1, 2]);
    const nextCollection = collection.switch(() => new Collection([3, 4]));
    const iterator = nextCollection[Symbol.iterator]();

    expect(nextCollection).toBeInstanceOf(Collection);
    expect(iterator.next().value).toBe(3);
    expect(iterator.next().value).toBe(4);
    expect(iterator.next().done).toBeTruthy();
  });
});

describe('core/containers/Collection: toDisposable method', () => {
  /**
   * Итератор коллекции по-умолчанию невозобновляемый
   */
  test('collection iterator is disposable by default', () => {
    const collection = new Collection([1, 2, 3, 4]);
    const iterator = collection[Symbol.iterator]();
    const callback = jest.fn();

    for (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(2);
  });

  /**
   * Коллекция остаётся невозобновляемой при вызове toDisposable
   */
  test('returns disposable collection', () => {
    const collection = new Collection([1, 2, 3, 4]).toDisposable();
    const iterator = collection[Symbol.iterator]();
    const callback = jest.fn();

    for (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(2);
  });
});

describe('core/containers/Collection: toResumable method', () => {
  /**
   * Коллекция остаётся возобновляемой при вызове toResumable
   */
  test('returns resumable collection', () => {
    const collection = new Collection([1, 2, 3, 4]).toResumable();
    const iterator = collection[Symbol.iterator]();
    const callback = jest.fn();

    for (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(4);
  });
});

describe('core/containers/Collection: isResumable method', () => {
  /**
   * Возвращает корректные значения после вызовов toDisposable и toResumable
   */
  test('isResumable method returns correct value', () => {
    const collection = new Collection([1, 2, 3]);

    expect(collection.isResumable()).toBeFalsy();

    collection.toDisposable();
    expect(collection.isResumable()).toBeFalsy();

    collection.toResumable();
    expect(collection.isResumable()).toBeTruthy();
  });
});

describe('core/containers/Collection: toIterable static method', () => {
  /**
   * Возвращает итерируемое значение
   */
  test('toIterable method returns iterable value', () => {
    const iterable = Collection.toIterable(1);

    expect(iterable).toHaveProperty([Symbol.iterator]);
  });

  /**
   * Возвращает итерируемое значение как оно было, если передано итерируемое
   */
  test('toIterable method returns iterable value as it is', () => {
    const iterable = Collection.toIterable([1, 2]);
    const iterator = iterable[Symbol.iterator]();

    expect(iterable).toHaveProperty([Symbol.iterator]);
    expect(iterator.next().value).toBe(1);
    expect(iterator.next().value).toBe(2);
    expect(iterator.next().done).toBeTruthy();
  });

  /**
   * Асинхронный итератор не имеет метода [Symbol.iterator], поэтому будет завёрнут в контейнер, как и примитив
   */
  test("toIterable method doesn't consider async iterator as iterable", () => {
    const asyncIterator = randomAsyncGenerator();
    const iterable = Collection.toIterable(asyncIterator);
    const iterator = iterable[Symbol.iterator]();

    expect(iterable).toHaveProperty([Symbol.iterator]);
    expect(iterator.next().value).toBe(asyncIterator);
    expect(iterator.next().done).toBeTruthy();
  });
});
