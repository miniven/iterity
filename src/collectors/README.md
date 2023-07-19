# Коллекторы

Функции-коллекторы предназначены для использования с методом `collect`, хотя могут использоваться обособленно без контейнеров.

Так же функции-коллекторы могут использоваться с методом `transform`. В таком случае метод вернёт экземпляр контейнера, в контексте которого был вызван, а сам возвращенный контейнер будет хранить итератор для значения, возвращенного функцией-коллектором.

---

### [average](#average)

Вычисляет среднее значение элементов коллекции и возвращает число.

```ts
average(iterable: Iterable<number>): number
```

Использование:

```ts
import { average } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(average); // 5
```

---

### [count](#count)

Возвращает количество элементов в коллекции.

```ts
count<T>(iterable: Iterable<T>): number
```

Использование:

```ts
import { count } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(count); // 4
```

---

### [first](#first)

Находит первый элемент коллекции и возвращает его, либо `undefined`, если коллекция пустая.

```ts
first<T>(iterable: Iterable<T>): T | undefined
```

Использование:

```ts
import { first } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(first); // 1
```

---

### [join](#join)

Объединяет все элементы коллекции строк в одну строку.

```ts
join(separator: string): (iterable: Iterable<string>) => string
```

Использование:

```ts
import { join } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(join('_')); // 1_2_3_4
```

---

### [last](#last)

Находит последний элемент коллекции и возвращает его, либо `undefined`, если коллекция пустая.

```ts
last<T>(iterable: Iterable<T>): T | undefined
```

Использование:

```ts
import { last } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(last); // 4
```

---

### [max](#max)

Находит максимальный элемент коллекции чисел и возвращает его, либо `undefined`, если коллекция пустая.

```ts
max(iterable: Iterable<number>): number | undefined
```

Использование:

```ts
import { max } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(max); // 4
```

---

### [min](#min)

Находит минимальный элемент коллекции чисел и возвращает его, либо `undefined`, если коллекция пустая.

```ts
min(iterable: Iterable<number>): number | undefined
```

Использование:

```ts
import { min } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(min); // 1
```

---

### [product](#product)

Вычисляет произведение всех элементов коллекции чисел и возвращает его, либо `0`, если коллекция пустая.

```ts
product(iterable: Iterable<number>): number
```

Использование:

```ts
import { product } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(product); // 24
```

---

### [reduce](#reduce)

Функция для приведения элементов коллекции к одному значению. Аналог `Array.prototype.reduce`.

```ts
type TReduceReturnType<T, Return> = (iterable: Iterable<T>) => Return | undefined;

reduce<T>(reducer: (acc: T, value: T, index: number) => T): TReduceReturnType<T, T>;
reduce<T, U>(reducer: (acc: U, value: T, index: number) => U, initial: U): TReduceReturnType<T, U>;
reduce<T, U>(
  reducer: (acc: T | U, value: T, index: number) => T | U,
  initial?: U
): TReduceReturnType<T, T | U>
```

Использование:

```ts
import { reduce } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(reduce((acc, num) => `${String(num)}_${acc}`, '')); // 4_3_2_1
```

---

### [sum](#sum)

Вычисляет сумму всех элементов коллекции чисел и возвращает его, либо `0`, если коллекция пустая.

```ts
sum(iterable: Iterable<number>): number
```

Использование:

```ts
import { sum } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(sum); // 10
```

---

### [toArray](#toArray)

Собирает все элементы коллекции в массив и возвращает его.

```ts
toArray<T>(iterable: Iterable<T>): Array<T>
```

Использование:

```ts
import { toArray } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(toArray); // [1, 2, 3, 4]
```

---

### [toSet](#toSet)

Собирает все элементы коллекции в Set и возвращает его.

```ts
toSet<T>(iterable: Iterable<T>): Set<T>
```

Использование:

```ts
import { toSet } from 'iterify';

const collection = from([1, 2, 3, 4]).collect(toSet); // Set(4) {1, 2, 3, 4}
```

---
