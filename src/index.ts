import { AsyncCollection } from './core/containers/AsyncCollection';
import { Collection } from './core/containers/Collection';
import { tap } from './decorators/tap';
import { skip } from './limitators/skip';
import { take } from './limitators/take';
import { map } from './modifiers/map';

async function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * (max - min)) + min);
      }, 1000);
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

(async function () {
  const asyncCollection = new AsyncCollection(random).pipe(take(4));
  const collection = new Collection([1, 2, 3, 4]).pipe(
    skip(1),
    take(2),
    map((value) => String(value)),
    tap(() => console.log('----------'))
  );

  for (const value of collection) {
    console.log('sync', value);
  }

  for await (const value of asyncCollection) {
    console.log(value);
  }
})();
