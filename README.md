# Iterity

Iterity is a library for easy and predictable work with iterable data structures.

[Russian version | Версия на русском 🧶](./README.rus.md)

## 🧗‍♂️ Motivation

Iterators are a universal interface for working with various types of collections. It allows us to iterate through collections without thinking of specific data structures.

With iterators, we can apply multiple transformations to a collection in one iteration. Let's look at an example. The following code shows work with an array and its methods:

```ts
const isActive = (sign) => sign.isActive;
const mapStateToStatus = (sign) => statuses[sign.state];

const uniqueStatuses = signatures.filter(isActive).map(mapStateToStatus);
```

The `filter` and `map` methods iterates through the original array and return a new array. Here's how this problem can be solved using iterators and the Iterity library:

```ts
const uniqueStatuses = from(signatures).pipe(
  filter(isActive),
  map(mapStateToStatus)
);
```

The code remains simple and declarative, but at the same time we got a number of advantages:

1. The `signatures` collection does not have to be an array: we could use `Set`, `LinkedList`, `BST` or any other data structure that implements the `[Symbol.iterator]` method.
2. Transformations will be applied only when they are needed, that is, when we start iterate through collection.
3. If the collection iteration is interrupted, for example, with `break` statement, then transformations are not applied to the remaining elements.
4. It is possible to use an infinite collection.

## 💡 Ideology

The Iterity library API is inspired by the RxJS library. Iterity provides containers for working with iterable objects, as well as functions for their transformation.

Iterity divides collections into synchronous and asynchronous. Synchronous collections have the `Symbol.iterator` method, and asynchronous collections have the `Symbol.AsyncIterator` method. In addition, each collection can be resumed: if iteration was interrupted by the `break` statement, then it can be continued in the future.

Iterity provides two containers — `Collection` and `AsyncCollection`. By default, the iterators of both containers are disposable. Both containers provide methods:

1. `pipe` to create a composition of iterators.
2. `collect` to convert the container to an arbitrary type: `number | string | boolean | []`, etc. This method, naturally, causes a collection iteration.
3. `switch` to change the container type, for example from `AsyncCollection` to `Collection`.
4. `toResumable` to cast the iterator to resumable type.
5. `toDisposable` to cast the iterator to disposable type.

The `pipe` method is the heart of the container. It allows us to create a composition of functions that determine the behavior of the iterator. With its help, it is easy to describe the chain of transformations and predict what values we will deal with.

## 🥁 Installation and usage

Using NPM:

```bash
npm install --save iterity
```

Using Yarn:

```bash
yarn add iterity
```

Basic usage:

```ts
import { from, tap } from 'iterity';

const collection = from([1, 2, 3]).pipe(tap((value) => console.log(value)));
```

## 🌚 Kind of documentation

### [Collection](#collection)

The `Collection` class is a container for a value to work with as a synchronous iterable collection. It implements the `Iterable` interface.

The `Collection` class accepts any value in its constructor. If this value already implements the `Iterable` interface (it is an array, string, Set, etc.), then it will be put in the container as it is.

If passed value is is not iterable, the class will create an iterator for it, which iterates over only the passed value.

Creating an instance:

```ts
const collection = new Collection(1);
```

#### [Methods](#collection_methods)

1. The static `toIterable` method transforms the passed value to iterable type, if it is needed.

   ```ts
   toIterable<T>(value: Iterable<T> | T): Iterable<T>;
   ```

2. The `pipe` method takes functions to transform the iterator, and returns a new instance of the `Collection` with a new value. Each function passed to `pipe` accepts `Iterable` and should return `Iterable`:

   ```ts
   operation<T, R>(iterable: Iterable<T>): IterableIterator<R>;
   ```

   The first function passed to `pipe` gets an iterator of the value stored in the container.

3. The `collect` method converts the container to an arbitrary type. It takes a function called «collector», which takes an `Iterable` and returns any value. The result returned by collector will be returned by `collect` method.

   ```ts
   collect<R>(collector: (iterable: Iterable<T>) => R): R;
   ```

   This method is used in such cases as calculating the product of all the numbers in the collection, combining all the elements of the collection into a string, and so on.

4. The `switch` method is designed to change the container type, for example from `AsyncCollection` to `Collection`. If the function passed to the method returns a `Collection` or `AsyncCollection` instance, then method returns this instance. Otherwise, new instance of the same class with new value will be returned.

   ```ts
   switch(switcher: (value: Iterable<T> | T) => T | Iterable<T> | AbstractCollection<T>): AbstractCollection<T>;
   ```

5. The `toResumable` and `toDisposable` methods allow us to control the iterator's possibility of being continued. The `toResumable` method allows us to break the collection iteration, but resume it later from the same position. `toDisposable` does the opposite. Both methods return the same instance. **⚠️ By default, all collections are disposable.**

### [AsyncCollection](#async_collection)

The `AsyncCollection` class is a container for a value to work with as an asynchronous iterable collection. It implements the`AsyncIterable` interface.

Creating an instance:

```ts
const collection = new AsyncCollection(1);
```

The interface and logic of `AsyncCollection` are similar to the `Collection` class, but there are a few exceptions:

1. If the constructor of `AsyncCollection` gets iterable object with synchronous iterator, then `AsyncCollection` transforms it to asynchronous.

2. Instead of the static `toIterable` method, the `AsyncCollection` class provides a static `toAsyncIterable` method, which casts the passed value to an asynchronous iterable type, if it is needed. It is able to transform a synchronous iterator to an asynchronous one.

   ```ts
   toAsyncIterable<T>(value: AsyncIterable<T> | Iterable<T> | T): AsyncIterable<T>;
   ```

Other methods work similarly to the methods of the `Collection` class, but synchronously. Functions for working with asynchronous collections are usually named with the postfix `Async`, for example: `mapAsync`, `takeAsync`, `filterAsync`.

### [Functions](#functions)

Iterity provides sets of functions for working with iterable collections. The functions are divided into groups according to the purposes of their application.

1. [collectors](./src/collectors/). Designed to transform the collection to an arbitrary type. Example: get the average of all the numbers in the collection. Used with the `collect` method.
2. [Selectors](./src/selectors/). Designed to select specific values from a collection. Examples: get an iterator for the first 10 elements of the collection, filter the elements of the collection. Used with the `pipe` method.
3. [Modifiers](./src/modifiers/). Designed to modify collections. Example: Map each value of a collection to a different value. Used with the `pipe` method.
4. [Decorators](./src/decorators/). Designed to add specific functionality, or data to an existing collection. Examples: add index to each element, add a function that will be called for each element. Used with the `pipe` method.
5. [Combiners](./src/combiners/). Designed to combine multiple collections into one. Used with the `pipe` method.

Iterity also provides a set of [helper functions](./src/core/helpers/).

😮 You can also write functions like these by yourself! Nothing prevents you from writing the necessary modifier and passing it to the `pipe` method, just like any collector for the `collect` method.

## 🍄 Examples

#### Example 1: Creating the simplest collection from a primitive value:

```ts
const collection = new Collection(1);

for (const number of collection) {
  console.log(number); // 1
}
```

#### Example 2: Creating a 10 random numbers collection.

The helper function `from` gets any value and returns an instance of the container `Collection`, or `AsyncCollection`.

```ts
import { from, take } from 'iterity';

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

#### Example 3: Creating a 10 random numbers asynchronous collection:

```ts
import { from, take } from 'iterity';

async function* asyncRandomGenerator(min = 0, max = 1) {
  ...
}

const random = asyncRandomGenerator(5, 10);
const asyncCollection = from(random).pipe(take(10));

for await (const number of asyncCollection) {
  console.log(number);
}
```

#### Example 4: Strings as iterable collections

Strings in JavaScript are also iterable collections, so we can work with them this way. The `collect` method transforms the collection to an arbitrary value, in this case to a string:

```ts
import { from, map, join } from 'iterity';

const uppercaseSeq = from('abcdef')
  .pipe(map((letter: string) => letter.toUpperCase()))
  .collect(join(''));

console.log(uppercaseSeq); // ABCDEF
```

#### Example 5: Event handling with asynchronous iterator:

```ts
import { from, mapAsync, enumerableAsync } from 'iterity';

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
