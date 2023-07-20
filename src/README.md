# Iterify

Iterify — библиотека для работы с итерируемыми структурами данных.

## 🧗‍♂️ Мотивация

Итераторы являются универсальным интерфейсом для работы с различными типами коллекций и позволяют абстрагироваться от конкретных структур данных при обходе коллекций.

Одним из главных преимуществ итераторов является ленивое вычисление значений. В отличие от массивов, итераторы вычисляют значения по мере необходимости, когда они запрашиваются.

Посмотрим на примере. В следующем фрагменте представлена работа с массивом через его методы:

```ts
const isActive = (sign) => sign.isActive;
const collectToSet = (set, status) => set.add(status);
const mapStateToStatus = (sign) => statuses[sign.state];

const uniqueStatuses = responses
  .filter(isActive)
  .map(mapStateToStatus)
  .reduce(collectToSet, new Set());
```

Вот как та же задача решается при помощи итераторов и библиотеки Iterify:

```ts
const uniqueStatuses = from(responses).pipe(
  filter(isActive),
  map(mapStateToStatus),
  reduce(collectToSet, new Set())
);
```

Код остаётся простым и декларативным, но при этом мы используем все преимущества итераторов, такие как ленивые вычисления значений, возможность создавать бесконечные последовательности и т.п.

## 💡 Идеология

API библиотеки Iterify вдохновлен библиотекой RxJS. Iterify предоставляет контейнеры для работы с итерируемыми объектами, а так же функции для их трансформации.

Iterify разделяет коллекции на синхронные и асинхронные. Синхронные коллекции имеют метод `Symbol.iterator`, а асинхронные — `Symbol.asyncIterator`. Кроме того, каждая коллекция может быть возобновляемой, то есть, если обход коллекции с использованием итератора был прерван вызовом `break`, то в дальнейшем его можно будет продолжить.

Iterify предоставляет два контейнера — `Collection` и `AsyncCollection`. По-умолчанию итераторы обоих контейнеров невозобновляемы. Оба контейнера предоставляют методы:

1. `pipe` для создания композиции итераторов.
2. `collect` для преобразования контейнера к произвольному типу: `number | string | boolean | []` и т.д.
3. `switch` для изменения типа контейнера, например с `AsyncCollection` на `Collection`.
4. `toResumable` для приведения итератора к возобновляемому типу.
5. `toDisposable` для итератора к невозобновляемому типу.

Метод `pipe` — сердце контейнера. Он позволяет составить композицию функций, которые определяют поведение итератора. С его помощью легко описать цепочку преобразований и предсказать, с какими значениями мы будем иметь дело при обходе коллекции.

## 🌚 Документация

Iterify предоставляет наборы функций для работы с итерируемыми коллекциями. Условно, функции разделены на группы по целям их применения.

1. [Коллекторы (collectors)](./collectors/). Предназначены для приведения коллекции к типу, отличному от контейнерного. Пример: получить среднее арифметическое всех чисел коллекции. Используются с методом `collect`.
2. [Лимитаторы (limitators)](./limitators/). Предназначены для сокращения/фильтрации коллекций. Примеры: получить итератор для первых 10 элементов коллекции, отфильтровать элементы коллекции. Используются с методом `pipe`.
3. [Модификаторы (modifiers)](./modifiers/). Предназначены для изменения коллекций. Пример: преобразовать каждое значение коллекции в другое значение. Используются с методом `pipe`.
4. [Декораторы (decorators)](./decorators/). Предназначены для добавления определенной функциональности, или данных к существующей коллекции. Примеры: добавить каждому элементу его порядковый номер, добавить функцию, которая будет вызвана для каждого элемента при обходе коллекции. Используются с методом `pipe`.
5. [Комбинаторы (combiners)](./combiners/). Предназначены для объединения нескольких коллекций в одну. Используются с методом `pipe`.

## 🍗 Примеры

### Создание простейшей коллекции из примитивного значения:

```ts
const collection = new Collection(1);

for (const number of collection) {
  console.log(number); // 1
}
```

---

### Создание коллекции из 10 псевдослучайных чисел.

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

---

### Создание асинхронной коллекции из 10 псевдослучайных чисел:

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

---

### Работа со строками

Так тоже можно, потому что строки в JavaScript тоже являются итерируемыми коллекциями. Метод `collect` приводит коллекцию к произвольному значению, в данном случае к строке:

```ts
import { from, map, join } from 'iterify';

const uppercaseSeq = from('abcdef')
  .pipe(map((letter: string) => letter.toUpperCase()))
  .collect(join(''));

console.log(uppercaseSeq); // ABCDEF
```

---

### Обработка событий с использованием асинхронного итератора:

```ts
import { from, mapAsync, enumerableAsync } from 'iterify';

async function* subscribe(element: Element, name: string): AsyncIterableIterator<Event> {
  ...
}

(async function() {
  const targets = from(subscribe(document.body, 'click')).pipe(mapAsync((event: Event) => event.target), enumerableAsync);

  for await (const target of targets) {
    console.log(target); // [index, HTMLElement]
  }
})();
```
