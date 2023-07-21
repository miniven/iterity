**[👈 Вернуться на главную](../../)**

# Комбинаторы

Функции-комбинаторы предназначены для объединения нескольких коллекций в одну.

- [sequence](#sequence)
- [sequenceAsync](#sequenceAsync)
- [zip](#zip)
- [append](#append)
- [appendAsync](#appendAsync)
- [prepend](#prepend)
- [prependAsync](#prependAsync)
- [repeat](#repeat)

## [sequence](#sequence)

Создает итератор, который объединяет элементы переданных коллекций в одну коллекцию.

```ts
sequence<T>(iterable: Iterable<T>, ...iterables: Array<Iterable<T>>): IterableIterator<T>;
```

Использование:

```ts
import { Collection, sequence } from 'iterity';

const cont = new Collection(3);
const collection = sequence([1, 2], cont); // OUTPUT: [1, 2, 3]

// Или можно без использования контейнера

const collection = sequence([1, 2], [3, 4], new Set([5])); // OUTPUT: [1, 2, 3, 4, 5]
```

## [sequenceAsync](#sequenceAsync)

Создает асинхронный итератор, который объединяет элементы переданных асинхронных коллекций в одну коллекцию.

```ts
sequence<T>(iterable: AsyncIterable<T>, ...iterables: Array<AsyncIterable<T>>): AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, sequenceAsync } from 'iterity';

const fromOneToThree = new AsyncCollection([1, 2, 3]);
const fromFourToSix = new AsyncCollection([4, 5, 6]);

const collection = sequenceAsync(fromOneToThree, fromFourToSix); // OUTPUT: [1, 2, 3, 4, 5, 6]
```

## [zip](#zip)

Создаёт итератор по кортежам элементов переданных коллекций.

```ts
zip<T>(...iterables: Array<Iterable<T>>): IterableIterator<Array<T>>;
```

Использование:

```ts
import { Collection, zip } from 'iterity';

const cont = new Collection(['one', 'two']);
const collection = zip<string | number>([1, 2], cont); // OUTPUT: [[1, 'one'], [2, 'two']]

// Недостающие элементы заменяются null:

const cont = new Collection(['one']);
const collection = zip<string | number>([1, 2], cont); // OUTPUT: [[1, 'one'], [2, null]]
```

## [append](#append)

Создает итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции после исходной.

```ts
append<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>): (iterable: Iterable<T>) => IterableIterator<T | R>;
```

Использование:

```ts
import { from, append } from 'iterity';

const collection = from([1, 2]).pipe(append([3, 4])); // OUTPUT: [1, 2, 3, 4]
```

## [appendAsync](#appendAsync)

Создает асинхронный итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции после исходной.

```ts
appendAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T | R>;
```

Использование:

```ts
import { AsyncCollection, appendAsync } from 'iterity';

const nextAsyncCollection = new AsyncCollection([3, 4]);
const collection = new AsyncCollection([1, 2]).pipe(
  appendAsync(nextAsyncCollection)
); // OUTPUT: [1, 2, 3, 4]
```

## [prepend](#prepend)

Создает итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции перед исходной.

```ts
prepend<T, R>(additional: Iterable<R>, ...iterables: Array<Iterable<R>>): (iterable: Iterable<T>) => IterableIterator<T | R>;
```

Использование:

```ts
import { from, prepend } from 'iterity';

const collection = from([1, 2]).pipe(prepend([-1, 0])); // OUTPUT: [-1, 0, 1, 2]
```

## [prependAsync](#prependAsync)

Создает асинхронный итератор, который объединяет элементы переданных коллекций с элементами исходной итерируемой коллекции, при этом вставляя переданные коллекции после исходной.

```ts
prependAsync<T, R>(additional: AsyncIterable<R>, ...iterables: Array<AsyncIterable<R>>): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T | R>;
```

Использование:

```ts
import { AsyncCollection, prependAsync } from 'iterity';

const nextAsyncCollection = new AsyncCollection([-1, 0]);
const collection = new AsyncCollection([1, 2]).pipe(
  prependAsync(nextAsyncCollection)
); // OUTPUT: [-1, 0, 1, 2]
```

## [repeat](#repeat)

Создаёт итератор, который повторяет исходную коллекцию заданное количество раз. По умолчанию — бесконечное количество раз.

```ts
repeat<T>(times: number = Infinity): (iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, repeat } from 'iterity';

const collection = from([1, 2, 3]).pipe(repeat(3)); // OUTPUT: [1, 2, 3, 1, 2, 3, 1, 2, 3]
```
