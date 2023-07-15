import { product, sum } from './collectors';
import { append } from './combiners/seq';
import { AsyncCollection } from './core/containers/AsyncCollection';
import { Collection } from './core/containers/Collection';
import { enumerable } from './decorators/enumerable';
import { tap } from './decorators/tap';
import {
  createIteratorYield,
  getAsyncIterableIterator,
  getIterableIterator,
  getIterator,
  toAsyncCollection,
} from './helpers';
import { skip } from './limitators/skip';
import { take, takeSync } from './limitators/take';
import { map } from './modifiers/map';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);
// const randomIterator = new Disposable(random)
//   .pipe(
//     take(8),
//     skip(1),
//     map((value) => String(value)),
//     tap((value) => console.log('after reverse', value))
//   )
//   .collect(reduce((acc, value) => `${acc}_${value}`));

// if (randomIterator) {
//   console.log(randomIterator);
// }

const fake = (num: number) =>
  new Promise((resolve) => {
    // console.log(`fetch to https://google.com/?page=${num}`);

    setTimeout(() => {
      resolve(`response: ${num}`);
    }, 1000);
  });

(async function () {
  const collection = new Collection(random).pipe(takeSync(10)).toResumable().collect(getIterableIterator);

  for (const value of collection) {
    console.log(value);

    if (value > 7) {
      break;
    }
  }

  for (const value of collection) {
    console.log('second', value);
  }
})();
