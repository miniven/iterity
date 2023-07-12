import { average } from './collectors/average';
import { count } from './collectors/count';
import { sum } from './collectors/sum';
import { append } from './combiners/seq';
import { Disposable, Resumable, toDisposable, toResumable } from './core';
import { enumerable } from './decorators/enumerable';
import { tap } from './decorators/tap';
import { filter } from './limitators/filter';
import { take } from './limitators/take';
import { map } from './modifiers/map';
import { toSet } from './collectors/toSet';
import { max } from './collectors/max';
import { min } from './collectors/min';
import { join } from './collectors/join';
import { first } from './collectors/first';
import { last } from './collectors/last';
import { reduce } from './collectors/reduce';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);
const randomIterator = new Disposable(random)
  .pipe(
    take(8),
    map((value) => String(value)),
    tap((value) => console.log('number', value))
  )
  .collect(reduce((acc, value) => acc + value));

console.log(randomIterator);
