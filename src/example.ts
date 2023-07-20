import { AsyncCollection, Collection, from, toAsyncCollection, toSyncCollection } from './core';
import { enumerable, enumerableAsync } from './decorators';
import { filter, skip, slice, take, takeAsync } from './limitators';
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
  const targets = from(subscribe(document.body, 'click')).pipe(take(10));

  for await (const target of targets) {
    console.log(target); // [index, HTMLElement]
  }
})();
