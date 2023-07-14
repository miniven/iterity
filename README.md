# Iterable.JS

Библиотека для работы с перебираемыми структурами данных

## Мотивация

Тут нужно описать, что такое перебираемые объекты и почему имеет смысл использовать их в определенных случаях, рассказать о преимуществе ленивого обхода коллекций.

## Концепция библиотеки

Библиотека представляет контейнеры для работы с перебираемыми коллекциями. Любое значение, помещенное в контейнер, становится перебираемым.

Есть два вида контейнеров — возобновляемые и обычные. Возобновляемый — это коллекция, перебор которуй можно завершить через `break`, но позже возобновить с того же места. Обычные коллекции полностью завершаются после `break`.

Любой контейнер может быть преобразован в контейнер другого типа, но это будет иметь смысл только до начала перебора. Например, у меня есть исходный перебираемый объект и в одном файле я хочу использовать его как есть, а в другом — сделать его возобновляемым. Это возможно, потому что преобразование не изменяет исходную коллекцию, а лишь помещает её в новый контейнер. НЕТ! НУЖНО ПОДУМАТЬ!

Далее, используя метод `pipe` можно составить композицию функций, которые определяют поведение итератора. Каждая из этих функций — декоратор для итератора, то есть получает итератор и возвращает новый итератор. Таким образом мы описываем цепочку преобразований и легко можем предсказать, с какими значениями будем иметь дело при итерации.

> Преимущество использования композиции, а не множества методов класса в двух вещах: композиция позволяет использовать tree shaking и композиция позволяет писать собственные декораторы (хотя в случае с методами можно было сделать специальный метод для собственных классов, но композиция единообразнее)

Так же контейнер предоставляет метод `transform` для изменения типа контейнера, в котором хранится значение. Новый контейнер может быть произвольным: от специальных контейнеров, предоставляемых библиотекой, до обычных массивов или сетов. Это полезно, когда мы хотим на выходе получить массив, или указать, что итератор полностью завершается после вызова `break`.

## Примеры использования

```ts
const map = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
]);

const values = new Iterable(map).pipe(
  map((entry: [string, number]) => entry[1]),
  filter((value: number) => value > 1)
);

const keys = new Iterable(['two', 'three']);

for (const entry of zip(keys, values)) {
  console.log(entry);
}

// two
// 2
// three
// 3
```

В `pipe` можно отправлять какие угодно декораторы для перебираемых коллекций, не опасаясь, что коллекция вдруг станет возобновляемой, потому что `pipe` возвращает тот же тип конструктора, который использовался изначально.

Если разработчик использовал `ResumableIterable`, то он ожидает, что у него будет возможность продолжить итерацию по коллекции даже после вызова `break`. Методы класса `ResumableIterable` гарантируют, что это поведение не изменится.

Исключение — методы `toBreakable` и `toResumable`, используемые для осознанного изменения типа контейнера и, соответственно, поведения коллекции при вызове `break`.

## Что еще нужно решить:

Подумать, что делать с комбинаторами типа `zip`, `seq`... Семантически им не следует быть в `pipe`. Как будто комбинировать лучше заранее и возвращать экземпляр класса.

Но зато если передавать их в `pipe`, то можно быть уверенным, что экземпляр останется тем же, каким и был до слияния. Если нужно указать порядок, где должен быть текущий экземпляр, можно использовать дырку `Resumable.space`;

```ts
const disposable = new Disposable([1, 2, 3, 4, 5]);
const another = disposable.transform(toResumable);

for (const value of disposable) {
  console.log(value);
}

for (const value of another) {
  console.log(value); // ОТРАБОТАЕТ?? НЕТ! Нужен COPY
}
```

## Примеры

Хороший пример: есть массив URL'ов и нужно сделать запросы по каждому (или по некоторым через skip/take/slice) и вернуть асинхронный итератор

```ts
(async function () {
  const collection = new Collection([1, 2, 3, 4])
    .pipe(
      skip(1),
      map((value: number) => fake(value)),
      append([5])
    )
    .transform(toAsyncCollection);

  for await (const value of collection) {
    console.log('sync to async', value);
  }
})();
```

## Преимущества

1. Лекго выучить, потому что RxJS-подобный синтаксис
2. Легко расширять: пишете любой декоратор и используете его в pipe. Пишете любой коллектор и используете его в collect
