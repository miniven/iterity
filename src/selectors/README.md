# Селекторы

Функции-селекторы предназначены для выбора определенных значений из коллекции и используются с методом `pipe`, хотя могут использоваться обособленно без контейнеров.

---

### [filter](#filter)

Функция для фильтрации коллекции по условию, заданному в предикате:

```ts
filter<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, filter } from 'iterity';

const collection = from([1, 6, 2, 8]).pipe(filter((num) => num > 2)); // OUTPUT: [6, 8]
```

---

### [filterAsync](#filter_async)

Функция для фильтрации асинхронной коллекции по условию, заданному в предикате:

```ts
filterAsync<T>(predicate: (value: T) => boolean): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, filterAsync } from 'iterity';

const collection = new AsyncCollection([1, 6, 2, 8]).pipe(
  filterAsync((num) => num > 2)
); // OUTPUT: [6, 8]
```

---

### [skip](#skip)

Функция для создания итератора, исключающего N первых элементов исходного итератора:

```ts
skip(amount: number): <T>(iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, skip } from 'iterity';

const collection = from([1, 2, 3, 4]).pipe(skip(1)); // OUTPUT: [2, 3, 4]
```

---

### [skipAsync](#skip_async)

Функция для создания асинхронного итератора, исключающего N первых элементов исходного итератора:

```ts
skipAsync(amount: number): <T>(iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, skipAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3, 4]).pipe(skipAsync(1)); // OUTPUT: [2, 3, 4]
```

---

### [skipWhile](#skipwhile)

Функция для создания итератора, исключающего первые элементы исходного итератора, пока соблюдается условие:

```ts
skipWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, skipWhile } from 'iterity';

const collection = from([1, 2, 3, 4]).pipe(skipWhile((num) => num < 3)); // OUTPUT: [3, 4]
```

---

### [skipWhileAsync](#skipwhile_async)

Функция для создания асинхронного итератора, исключающего первые элементы исходного итератора, пока соблюдается условие:

```ts
skipWhileAsync<T>(predicate: (value: T) => boolean): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, skipWhileAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3, 4]).pipe(
  skipWhileAsync((num) => num < 3)
); // OUTPUT: [3, 4]
```

---

### [slice](#slice)

Функция для создания итератора для определённого диапазона значений исходного итератора:

```ts
slice(from: number, to: number): <T>(iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, slice } from 'iterity';

const collection = from([1, 2, 3, 4]).pipe(slice(1, 3)); // OUTPUT: [2, 3]
```

---

### [sliceAsync](#slice_async)

Функция для создания асинхронного итератора для определённого диапазона значений исходного итератора:

```ts
sliceAsync(from: number, to: number): <T>(iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, sliceAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3, 4]).pipe(sliceAsync(1, 3)); // OUTPUT: [2, 3]
```

---

### [take](#take)

Функция для создания итератора для первых N элементов исходного итератора:

```ts
take(limit: number): <T>(iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, take } from 'iterity';

const collection = from([1, 2, 3, 4]).pipe(take(3)); // OUTPUT: [1, 2, 3]
```

---

### [takeAsync](#take_async)

Функция для создания асинхронного итератора для первых N элементов исходного итератора:

```ts
takeAsync(limit: number): <T>(iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, takeAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3, 4]).pipe(takeAsync(3)); // OUTPUT: [1, 2, 3]
```

---

### [takeWhile](#takewhile)

Функция для создания итератора, перебирающего первые элементы исходного итератора, пока соблюдается условие:

```ts
takeWhile<T>(predicate: (value: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>;
```

Использование:

```ts
import { from, takeWhile } from 'iterity';

const collection = from([1, 2, 3, 4]).pipe(takeWhile((num) => num < 3)); // OUTPUT: [1, 2]
```

---

### [takeWhileAsync](#takewhile_async)

Функция для создания асинхронного итератора, перебирающего первые элементы исходного итератора, пока соблюдается условие:

```ts
takeWhileAsync<T>(predicate: (value: T) => boolean): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>;
```

Использование:

```ts
import { AsyncCollection, takeWhileAsync } from 'iterity';

const collection = new AsyncCollection([1, 2, 3, 4]).pipe(
  takeWhileAsync((num) => num < 3)
); // OUTPUT: [1, 2]
```

---
