# Iterify

Iterify — библиотека для работы с итерируемыми структурами данных.

## 🧗‍♂️ Мотивация

Вместо этого:

```ts
const isActive = (sign) => sign.isActive;
const mapStateToStatus = (sign) => statuses[sign.state];

const signaturesStatuses = responses.flat().filter(isActive).map(mapStateToStatus);
```

Можно написать вот это:

```ts
const isActive = (sign) => sign.isActive;
const mapStateToStatus = (sign) => statuses[sign.state];

const signaturesStatuses = from(responses).pipe(flat, filter(isActive), map(mapStateToStatus));
```

## 💡 Идеология

API библиотеки Iterify вдохновлен API RxJS. Iterify предоставляет контейнеры для работы с итерируемыми объектами, а так же функции для их трансформации.

Iterify разделяет коллекции на синхронные и асинхронные. Синхронные коллекции имеют метод `Symbol.iterator`, а асинхронные — `Symbol.asyncIterator`. Кроме того, каждая коллекция может быть возобновляемой, то есть, если обход коллекции с использованием итератора был прерван вызовом `break`, то в дальнейшем его можно будет продолжить.

Iterify предоставляет два контейнера — `Collection` и `AsyncCollection`. По-умолчанию итераторы обоих контейнеров невозобновляемы. Оба контейнера предоставляют методы:

1. `pipe` для создания композиции итераторов.
2. `collect` для преобразования контейнера к произвольному типу: `number | string | boolean | []` и т.д.
3. `transform` для изменения типа контейнера, например с `AsyncCollection` на `Collection`.
4. `toResumable` для приведения итератора к возобновляемому типу.
5. `toDisposable` для итератора к невозобновляемому типу.

Метод `pipe` — сердце контейнера. Он позволяет составить композицию функций, которые определяют поведение итератора. С его помощью легко описать цепочку преобразований и предсказать, с какими значениями мы будем иметь дело при обходе коллекции.

## 🌚 Документация

Iterify предоставляет наборы функций для работы с итерируемыми коллекциями. Условно, функции разделены на группы по целям их применения.

1. [Функции-коллекторы (collectors)](./collectors/). Предназначены для приведения коллекции к типу, отличному от контейнерного. Пример: получить среднее арифметическое всех чисел коллекции. Используются с методом `collect`.

2. [Функции-лимитаторы (limitators)](./limitators/). Предназначены для сокращения/фильтрации коллекций. Примеры: получить итератор для первых 10 элементов коллекции, отфильтровать элементы коллекции. Используются с методом `pipe`.

3. [Функции-модификаторы (modifiers)](./modifiers/). Предназначены для изменения коллекций. Пример: преобразовать каждое значение коллекции в другое значение. Используются с методом `pipe`.

4. [Функции-декораторы (decorators)](./decorators/). Предназначены для добавления определенной функциональности, или данных к существующей коллекции. Примеры: добавить каждому элементу его порядковый номер, добавить функцию, которая будет вызвана для каждого элемента при обходе коллекции. Используются с методом `pipe`.

5. [Функции-комбинаторы (combiners)](./combiners/). Предназначены для объединения нескольких коллекций в одну. Используются с методом `pipe`.

## 🍗 Примеры

Создание простейшей коллекции из примитивного значения:

```ts
const collection = new Collection(1);

for (const number of collection) {
  console.log(number); // 1
}
```

Создание коллекции из 10 псевдослучайных чисел. Вспомогательная функция `from` получает любое значение и возвращает экземпляр контейнера `Collection`, или `AsyncCollection`.

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

Создание асинхронной коллекции из 10 псевдослучайных чисел:

```ts
import { from, take } from 'iterify';

async function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * (max - min)) + min;

        resolve(num);
      }, 1000);
    });
  }
}

const random = randomGenerator(5, 10);
const collection = from(random).pipe(take(10));

for await (const number of collection) {
  console.log(number);
}
```
