import { append } from './combiners/seq';
import { AsyncCollection } from './core/containers/AsyncCollection';
import { Collection } from './core/containers/Collection';
import { tap } from './decorators/tap';
import { createIteratorYield, toAsyncCollection } from './helpers';
import { skip } from './limitators/skip';
import { take } from './limitators/take';
import { map } from './modifiers/map';

async function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * (max - min)) + min);
      }, 3000);
    });
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
  const asyncCollection = new AsyncCollection(random).pipe(take(4), skip(1));
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

  for await (const value of asyncCollection) {
    console.log(value);
  }
})();
