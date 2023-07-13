import { Disposable } from './core';
import { tap } from './decorators/tap';
import { take } from './limitators/take';
import { map } from './modifiers/map';
import { reduce } from './collectors/reduce';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);
const randomIterator = new Disposable([1, 2, 3, 4])
  .pipe(
    take(8),
    map((value) => String(value)),
    tap((value) => console.log('after reverse', value))
  )
  .collect(reduce((acc, value) => acc.concat(value), [] as Array<string>));

if (randomIterator) {
  console.log([...randomIterator]);
}
