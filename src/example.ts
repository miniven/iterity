import { AsyncCollection, Collection, from, toAsyncCollection, toSyncCollection } from './core';
import { enumerable, enumerableAsync } from './decorators';
import { filter, filterAsync, skip, skipWhile, slice, take, takeAsync } from './selectors';
import { map } from './modifiers';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

function* subscribe(element: Element, name: string): IterableIterator<Event> {
  return {} as IterableIterator<Event>;
}

(async function () {
  const collection = from([1, 2, 3, 4]).pipe(slice(1, 3)); // OUTPUT: [2, 3]

  console.log([...collection]);
})();
