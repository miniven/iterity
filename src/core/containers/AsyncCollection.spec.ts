import { lensToYieldDone, lensToYieldValue, randomAsyncGenerator, randomGenerator } from '../../tests/helpers';
import { enumerableAsync } from '../../decorators';
import { takeAsync } from '../../selectors';
import { AsyncCollection } from './AsyncCollection';

describe('core/containers/AsyncCollection: base iterator', () => {
  /**
   * Примитивное значение внутри контейнера становится итерируемым
   */
  test('primitive value becomes iterable', async () => {
    const collection = new AsyncCollection(1);

    expect(collection).toHaveProperty([Symbol.asyncIterator]);

    const iterator = collection[Symbol.asyncIterator]();
    const next = iterator.next();

    expect(next).toBeInstanceOf(Promise);
    expect(next.then(lensToYieldValue)).resolves.toBe(1);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });

  /**
   * Коллекция на основе массива итерируется по элементам массива
   */
  test('iterable array in collection stays as it is', async () => {
    const collection = new AsyncCollection([1, 2]);
    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });

  /**
   * Коллекция на основе Set'а итерируется по элементам Set'а
   */
  test('iterable Set in collection stays as it is', async () => {
    const collection = new AsyncCollection(new Set([1, 2]));
    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('core/containers/AsyncCollection: pipe method', () => {
  /**
   * Метод pipe добавляет итератор поверх оригинального значения
   */
  test('adds iterator over original value', () => {
    const multiplyByTwo = (value: number) => value * 2;
    const collection = new AsyncCollection([1, 2, 3]).pipe((iterable) => {
      const iterator = iterable[Symbol.asyncIterator]();

      return {
        [Symbol.asyncIterator]() {
          return {
            async next() {
              const next = await iterator.next();

              if (next.done) {
                return next;
              }

              return { done: false, value: multiplyByTwo(next.value) };
            },
          };
        },
      };
    });

    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(2);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(4);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(6);
    expect(iterator.next().then(lensToYieldDone)).toBeTruthy();
  });

  /**
   * Метод pipe создаёт композицию из нескольких итераторов поверх оригинального значения
   */
  test('composes multiple iterators over original value', () => {
    const collection = new AsyncCollection(['1', '2', '3']).pipe(enumerableAsync, takeAsync(2));
    const iterator = collection[Symbol.asyncIterator]();

    expect(iterator.next().then(lensToYieldValue)).resolves.toStrictEqual([0, '1']);
    expect(iterator.next().then(lensToYieldValue)).resolves.toStrictEqual([1, '2']);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('core/containers/AsyncCollection: collect method', () => {
  /**
   * Метод collect возвращает значение, возвращенное из функции, не трогая оригинальный экземпляр класса
   */
  test('returns same value as collector without changing original class instance', () => {
    const collection = new AsyncCollection([1, 2]);

    expect(collection).toBeInstanceOf(AsyncCollection);

    const value = collection.collect(async (iterable) => {
      let sum = 0;

      for await (const value of iterable) {
        sum += value;
      }

      return sum;
    });

    expect(collection).toBeInstanceOf(AsyncCollection);
    expect(value).toBeInstanceOf(Promise);
    expect(value).resolves.toBe(3);
  });

  /**
   * Метод collect возвращает экземпляр того же класса, если это было явно указано в функции
   * При этом это должны быть разные экземпляры
   */
  test('returns instance of the same container if it was specified', () => {
    const collection = new AsyncCollection([1, 2]);

    expect(collection).toBeInstanceOf(AsyncCollection);

    const value = collection.collect((iterable) => new AsyncCollection(iterable));

    expect(collection).toBeInstanceOf(AsyncCollection);
    expect(value).toBeInstanceOf(AsyncCollection);
    expect(collection).not.toBe(value);
  });
});

describe('core/containers/AsyncCollection: switch method', () => {
  /**
   * Возвращает новый экземпляр того же класса, не трогая оригинальный экземпляр
   */
  test('returns instance of the same container without changing original instance', () => {
    const collection = new AsyncCollection([1, 2]);

    expect(collection).toBeInstanceOf(AsyncCollection);

    const nextCollection = collection.switch(() => 1);

    expect(collection).toBeInstanceOf(AsyncCollection);
    expect(nextCollection).toBeInstanceOf(AsyncCollection);
    expect(collection).not.toBe(nextCollection);
  });

  /**
   * Возвращает новый экземпляр того же класса, если функция возвращает не экземпляр класса, а примитив
   */
  test("returns instance of the same container with returned value if switcher doesn't return collection instance", () => {
    const collection = new AsyncCollection([1, 2]);
    const nextCollection = collection.switch(() => 1);
    const iterator = nextCollection[Symbol.asyncIterator]();

    expect(nextCollection).toBeInstanceOf(AsyncCollection);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(1);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });

  /**
   * Возвращает экземпляр класса, если функция его возвращает
   */
  test('returns instance of container if switcher returns collection instance', () => {
    const collection = new AsyncCollection([1, 2]);
    const nextCollection = collection.switch(() => new AsyncCollection([3, 4]));
    const iterator = nextCollection[Symbol.asyncIterator]();

    expect(nextCollection).toBeInstanceOf(AsyncCollection);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(3);
    expect(iterator.next().then(lensToYieldValue)).resolves.toBe(4);
    expect(iterator.next().then(lensToYieldDone)).resolves.toBeTruthy();
  });
});

describe('core/containers/AsyncCollection: toDisposable method', () => {
  /**
   * Итератор коллекции по-умолчанию невозобновляемый
   */
  test('collection iterator is disposable by default', async () => {
    const collection = new AsyncCollection([1, 2, 3, 4]);
    const iterator = collection[Symbol.asyncIterator]();
    const callback = jest.fn();

    for await (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for await (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(2);
  });

  /**
   * Коллекция остаётся невозобновляемой при вызове toDisposable
   */
  test('returns disposable collection', async () => {
    const collection = new AsyncCollection([1, 2, 3, 4]).toDisposable();
    const iterator = collection[Symbol.asyncIterator]();
    const callback = jest.fn();

    for await (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for await (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(2);
  });
});

describe('core/containers/AsyncCollection: toResumable method', () => {
  /**
   * Коллекция остаётся возобновляемой при вызове toResumable
   */
  test('returns resumable collection', async () => {
    const collection = new AsyncCollection([1, 2, 3, 4]).toResumable();
    const iterator = collection[Symbol.asyncIterator]();
    const callback = jest.fn();

    for await (const value of iterator) {
      callback(value);

      if (value === 2) {
        break;
      }
    }

    for await (const value of iterator) {
      callback(value);
    }

    expect(callback).toBeCalledTimes(4);
  });
});

describe('core/containers/AsyncCollection: isResumable method', () => {
  /**
   * Возвращает корректные значения после вызовов toDisposable и toResumable
   */
  test('isResumable method returns correct value', () => {
    const collection = new AsyncCollection([1, 2, 3]);

    expect(collection.isResumable()).toBeFalsy();

    collection.toDisposable();
    expect(collection.isResumable()).toBeFalsy();

    collection.toResumable();
    expect(collection.isResumable()).toBeTruthy();
  });
});

describe('core/containers/AsyncCollection: toAsyncIterable static method', () => {
  /**
   * Возвращает итерируемое значение
   */
  test('toAsyncIterable method returns iterable value', () => {
    const iterable = AsyncCollection.toAsyncIterable(1);

    expect(iterable).toHaveProperty([Symbol.asyncIterator]);
  });

  /**
   * Возвращает итерируемое значение как оно было, если передано итерируемое
   */
  test('toAsyncIterable method returns iterable value as it is', () => {
    const iterable = AsyncCollection.toAsyncIterable(randomAsyncGenerator());
    const iterator = iterable[Symbol.asyncIterator]();

    expect(iterable).toHaveProperty([Symbol.asyncIterator]);
    expect(iterator.next().then((data) => typeof lensToYieldValue(data))).resolves.toBe('number');
    expect(iterator.next().then((data) => typeof lensToYieldValue(data))).resolves.toBe('number');
  });

  /**
   * Обычный итератор преобразуется к асинхронному
   */
  test('toAsyncIterable method transform sync iterable to async', () => {
    const randomIterator = randomGenerator();
    const randomAsyncIterable = AsyncCollection.toAsyncIterable(randomIterator);
    const iterator = randomAsyncIterable[Symbol.asyncIterator]();

    expect(randomIterator).not.toHaveProperty([Symbol.asyncIterator]);
    expect(randomAsyncIterable).toHaveProperty([Symbol.asyncIterator]);

    const next = iterator.next();

    expect(next).toBeInstanceOf(Promise);
    expect(next.then((data) => typeof lensToYieldValue(data))).resolves.toBe('number');
  });
});
