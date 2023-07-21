**[👈 Вернуться на главную](../../)**

# Модификаторы

Функции-модификаторы предназначены для изменения значений коллекций и используются с методом `pipe`, хотя могут использоваться обособленно без контейнеров.

- [map](#map)
- [mapAsync](#mapAsync)
- [reverse](#reverse)

## [map](#map)

Функция для преобразования каждого элемента итерируемой коллекции с помощью указанной функции:

```ts
map<T, R>(mapper: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R>
```

Использование:

```ts
import { from, map } from 'iterity';

const collection = from([1, 2, 3]).pipe(map((num) => String(num))); // OUTPUT: ["1", "2", "3"]
```

## [mapAsync](#mapAsync)

Функция для преобразования каждого элемента итерируемой коллекции с помощью указанной функции:

```ts
mapAsync<T, R>(mapper: (value: T) => R): (iterable: AsyncIterable<T>) => AsyncIterableIterator<R>
```

Использование:

```ts
import { AsyncCollection, mapAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3]).pipe(
  mapAsync((num) => String(num))
); // OUTPUT: ["1", "2", "3"]
```

## [reverse](#reverse)

Функция для обращения порядка элементов в итерируемой коллекции. Создает новый итератор, который возвращает элементы исходной коллекции в обратном порядке

```ts
reverse<T>(iterable: Iterable<T>): IterableIterator<T>;
```

Использование:

```ts
import { from, reverse } from 'iterity';

const collection = from([1, 2, 3]).pipe(reverse); // OUTPUT: [3, 2, 1]
```
