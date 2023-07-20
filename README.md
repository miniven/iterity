# Iterify

Iterify — библиотека для работы с итерируемыми структурами данных.

## 🧗‍♂️ Мотивация

Итераторы являются универсальным интерфейсом для работы с различными типами коллекций и позволяют абстрагироваться от конкретных структур данных при обходе коллекций.

Используя итераторы мы можем применять несколько преобразований к коллекции за одну итерацию. Посмотрим на примере. В следующем фрагменте представлена работа с массивом через его методы:

```ts
const isActive = (sign) => sign.isActive;
const mapStateToStatus = (sign) => statuses[sign.state];

const uniqueStatuses = signatures.filter(isActive).map(mapStateToStatus);
```

Методы `filter` и `map` обходят массив и возвращают новый массив. А вот как эта задача решается при помощи итераторов и библиотеки Iterify:

```ts
const uniqueStatuses = from(signatures).pipe(
  filter(isActive),
  map(mapStateToStatus)
);
```

Код остаётся простым и декларативным, но при этом мы получили ряд преимуществ:

1. Коллекция `signatures` не обязана быть массивом: мы могли бы использовать `Set`, `LinkedList`, `BST` или любую другую структуру, которая реализует метод `[Symbol.iterator]`.
2. Преобразования будут применены тогда, когда они потребуются, то есть при переборе коллекции. До тех пор не будет выполнено ни одной итерации.
3. Если обход коллекции будет прерван, например, через `break`, то преобразования к оставшимся элементам не применяются.
4. Есть возможность использовать бесконечную последовательность.

## 💡 Идеология

API библиотеки Iterify вдохновлен библиотекой RxJS. Iterify предоставляет контейнеры для работы с итерируемыми объектами, а так же функции для их трансформации.

Iterify разделяет коллекции на синхронные и асинхронные. Синхронные коллекции имеют метод `Symbol.iterator`, а асинхронные — `Symbol.asyncIterator`. Кроме того, каждая коллекция может быть возобновляемой, то есть, если обход коллекции с использованием итератора был прерван вызовом `break`, то в дальнейшем его можно будет продолжить.

Iterify предоставляет два контейнера — `Collection` и `AsyncCollection`. По-умолчанию итераторы обоих контейнеров невозобновляемы. Оба контейнера предоставляют методы:

1. `pipe` для создания композиции итераторов.
2. `collect` для преобразования контейнера к произвольному типу: `number | string | boolean | []` и т.д. Метод, закономерно, вызывает перебор коллекции.
3. `switch` для изменения типа контейнера, например с `AsyncCollection` на `Collection`.
4. `toResumable` для приведения итератора к возобновляемому типу.
5. `toDisposable` для итератора к невозобновляемому типу.

Метод `pipe` — сердце контейнера. Он позволяет составить композицию функций, которые определяют поведение итератора. С его помощью легко описать цепочку преобразований и предсказать, с какими значениями мы будем иметь дело при обходе коллекции.

## 🌚 Вместо документации

### [Collection](#collection)

Класс `Collection` — контейнер для значения, с которым нужно работать как с синхронной итерируемой коллекцией. Реализует интерфейс `Iterable`.

Класс `Collection` принимает любое значение в своём конструкторе. Если это значение уже реализует интерфейс `Iterable` (является массивом, строкой, Set'ом и т.д.), то оно помещается в контейнер без изменений и итерация будет происходить по его элементам.

Если передано неитерируемое значение, то для него будет создан итератор, который перебирает только переданное значение.

Создание экземпляра класса:

```ts
const collection = new Collection(1);
```

#### [Методы](#collection_methods)

1. Статический метод `toIterable` приводит переданное значение к итерируемому типу, если оно таким не является изначально.

   ```ts
   toIterable<T>(value: Iterable<T> | T): Iterable<T>;
   ```

2. Метод `pipe` принимает функции для преобразования итератора, а возвращает новый экземпляр класса `Collection`, но уже с новым значением. Каждая функция, переданная в `pipe`, принимает `Iterable` и должна возвращать `Iterable`.

   ```ts
   operation<T, R>(iterable: Iterable<T>): IterableIterator<R>;
   ```

   Первая функция, переданная в `pipe`, получает итератор значения, хранящегося в контейнере.

3. Метод `collect` преобразует контейнер к произвольному типу. Он принимает функцию, называемую «коллектор», которая принимает `Iterable` и возвращает любое значение. Результатом вызова метода `collect` будет значение, возвращенное коллектором.

   ```ts
   collect<R>(collector: (iterable: Iterable<T>) => R): R;
   ```

   Этот метод используется в таких случаях, как расчёт произведения всех чисел коллекции, объединения всех элементов коллекции в одну строку и т.д.

4. Метод `switch` предназначен для изменения типа контейнера, например с `AsyncCollection` на `Collection`. Если переданная методу функция возвращает контейнер `Collection` или `AsyncCollection`, то он возвращает этот контейнер. В противном случае возвращается экземпляр того же класса, но с новым значением.

   ```ts
   switch(switcher: (value: Iterable<T> | T) => T | Iterable<T> | AbstractCollection<T>): AbstractCollection<T>;
   ```

5. Методы `toResumable` и `toDisposable` позволяют управлять «возобновляемостью» итератора. Метод `toResumable` позволяет прервать перебор коллекции, но позже возобновить с той же позиции. `toDisposable` делает противоположное. Оба метода возвращают тот же экземпляр класса, в контексте которого вызваны. **⚠️ По-умолчанию все коллекции невозобновляемы.**

### [AsyncCollection](#async_collection)

Класс `AsyncCollection` — контейнер для значения, с которым нужно работать как с асинхронной итерируемой коллекцией. Реализует интерфейс `AsyncIterable`.

Создание экземпляра класса:

```ts
const collection = new AsyncCollection(1);
```

Интерфейс и логика работы `AsyncCollection` аналогичны классу `Collection`, но есть несколько исключений:

1. Если в `AsyncCollection` передан итерируемый объект, имеющий синхронный итератор, то `AsyncCollection` преобразует его в асинхронный.

2. Вместо статического метода `toIterable` класс `AsyncCollection` предоставляет статический метод `toAsyncIterable`, который приводит переданное значение к асинхронному итерируемому типу, если оно таким не является изначально. В том числе умеет приводить синхронный итератор к асинхронному.

   ```ts
   toAsyncIterable<T>(value: AsyncIterable<T> | Iterable<T> | T): AsyncIterable<T>;
   ```

Все остальные методы работают аналогично методам класса `Collection`, но с поправкой на асинхронность.

### [Функции](#functions)

Iterify предоставляет наборы функций для работы с итерируемыми коллекциями. Условно, функции разделены на группы по целям их применения.

1. [Коллекторы (collectors)](./src/collectors/). Предназначены для приведения коллекции к типу, отличному от контейнерного. Пример: получить среднее арифметическое всех чисел коллекции. Используются с методом `collect`.
2. [Лимитаторы (limitators)](./src/limitators/). Предназначены для сокращения/фильтрации коллекций. Примеры: получить итератор для первых 10 элементов коллекции, отфильтровать элементы коллекции. Используются с методом `pipe`.
3. [Модификаторы (modifiers)](./src/modifiers/). Предназначены для изменения коллекций. Пример: преобразовать каждое значение коллекции в другое значение. Используются с методом `pipe`.
4. [Декораторы (decorators)](./src/decorators/). Предназначены для добавления определенной функциональности, или данных к существующей коллекции. Примеры: добавить каждому элементу его порядковый номер, добавить функцию, которая будет вызвана для каждого элемента при обходе коллекции. Используются с методом `pipe`.
5. [Комбинаторы (combiners)](./src/combiners/). Предназначены для объединения нескольких коллекций в одну. Используются с методом `pipe`.

Так же Iterify предоставляет набор [функций-хелперов](./src/core/helpers/).

😮 А еще вы можете написать такие функции самостоятельно! Ничто не мешает написать нужный модификатор и передать его в метод `pipe`, так же как и любой коллектор для метода `collect`.

## 🍄 Примеры

#### Пример 1: Создание простейшей коллекции из примитивного значения:

```ts
const collection = new Collection(1);

for (const number of collection) {
  console.log(number); // 1
}
```

#### Пример 2: Создание коллекции из 10 псевдослучайных чисел.

Вспомогательная функция `from` получает любое значение и возвращает экземпляр контейнера `Collection`, или `AsyncCollection`.

```ts
import { from, take } from 'iterify';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);
const collection = from(random).pipe(take(10));

for (const number of collection) {
  console.log(number);
}
```

#### Пример 3: Создание асинхронной коллекции из 10 псевдослучайных чисел:

```ts
import { from, take } from 'iterify';

async function* asyncRandomGenerator(min = 0, max = 1) {
  ...
}

const random = asyncRandomGenerator(5, 10);
const asyncCollection = from(random).pipe(take(10));

for await (const number of asyncCollection) {
  console.log(number);
}
```

#### Пример 4: Работа со строками

Так тоже можно, потому что строки в JavaScript тоже являются итерируемыми коллекциями. Метод `collect` приводит коллекцию к произвольному значению, в данном случае к строке:

```ts
import { from, map, join } from 'iterify';

const uppercaseSeq = from('abcdef')
  .pipe(map((letter: string) => letter.toUpperCase()))
  .collect(join('')); // Метод collect производит обход коллекции

console.log(uppercaseSeq); // ABCDEF
```

#### Пример 5: Обработка событий с использованием асинхронного итератора:

```ts
import { from, mapAsync, enumerableAsync } from 'iterify';

async function* subscribe(element: Element, name: string): AsyncIterableIterator<Event> {
  ...
}

(async function() {
  const extractTarget = (event: Event) => event.target;
  const targets = from(subscribe(document.body, 'click')).pipe(
    mapAsync(extractTarget),
    enumerableAsync
  );

  for await (const target of targets) {
    console.log(target); // [index, HTMLElement]
  }
})();
```
