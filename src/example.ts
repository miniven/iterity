import { AsyncCollection, Collection, from, toAsyncCollection, toSyncCollection } from './core';
import { enumerable, enumerableAsync } from './decorators';
import { filter, filterAsync, skip, skipWhile, slice, take, takeAsync } from './selectors';
import { map } from './modifiers';
import { prepend } from './combiners/prepend';
import { append, appendAsync } from './combiners';
import { repeat } from './combiners/repeat';
import { zip } from './combiners/zip';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

function* subscribe(element: Element, name: string): IterableIterator<Event> {
  return {} as IterableIterator<Event>;
}

(async function () {
  const collection = from([1, 2, 3]);
  const another = from(['100', 200]);

  for (const num of zip(collection, another)) {
    console.log(num);
  }
})();
