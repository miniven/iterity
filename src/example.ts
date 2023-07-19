import { AsyncCollection, Collection, from, toAsyncCollection, toSyncCollection } from './core';
import { enumerable, enumerableAsync } from './decorators';
import { slice, takeAsync, takeSync } from './limitators';
import { map } from './modifiers';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

async function* subscribe(element: Element, name: string): AsyncIterableIterator<Event> {
  return {} as AsyncIterableIterator<Event>;
}

(async function () {
  const targets = from(subscribe(document.body, 'click')).pipe(enumerableAsync);

  for await (const target of targets) {
    console.log(target); // [index, HTMLElement]
  }
})();
