**[👈 Вернуться на главную](../../)**

# Декораторы

Функции-декораторы предназначены для декорирования значений, например добавления определенной функциональности, или данных к существующей коллекции. Используются с методом `pipe`, хотя могут использоваться обособленно без контейнеров.

- [enumerable](#enumerable)
- [mapAsync](#mapAsync)
- [reverse](#reverse)

## [enumerable](#enumerable)

Добавляет индекс к каждому элементу итерируемой коллекции. Создаёт итератор, который возвращает пары `[индекс, значение]` для каждого элемента исходной коллекции.

```ts
enumerable<T>(iterable: Iterable<T>): IterableIterator<[number, T]>;
```

Использование:

```ts
import { from, enumerable } from 'iterity';

const collection = from(['one', 'two']).pipe(enumerable); // OUTPUT: [[1, "one"], [2, "two"]]
```

## [enumerableAsync](#enumerableAsync)

Добавляет индекс к каждому элементу итерируемой коллекции. Создаёт асинхронный итератор, который возвращает пары `[индекс, значение]` для каждого элемента исходной коллекции.

```ts
enumerableAsync<T>(iterable: AsyncIterable<T>): AsyncIterableIterator<[number, T]>;
```

Использование:

```ts
import { AsyncCollection, enumerableAsync } from 'iterity';

const collection = new AsyncCollection(['one', 'two']).pipe(enumerableAsync); // OUTPUT: [[1, "one"], [2, "two"]]
```

## [tap](#tap)

Создает итератор, который возвращает те же элементы, что и исходная коллекция, но позволяет выполнить заданное действие (эффект) для каждого элемента при прохождении по ним.

```ts
tap<T>(effect: (value: T) => void): (iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, tap } from 'iterity';

const collection = from([1, 2, 3]).pipe(tap((value) => console.log(value))); // OUTPUT: [1, 2, 3]
```

## [tapAsync](#tapAsync)

Создает асинхронный итератор, который возвращает те же элементы, что и исходная коллекция, но позволяет выполнить заданное действие (эффект) для каждого элемента при прохождении по ним.

```ts
tapAsync<T>(effect: (value: T) => void): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, tapAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3]).pipe(
  tapAsync((value) => console.log(value))
); // OUTPUT: [1, 2, 3]
```
