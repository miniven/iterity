import { Disposable } from './core';
import { tap } from './decorators/tap';
import { take } from './limitators/take';
import { map } from './modifiers/map';
import { reduce } from './collectors/reduce';
import { enumerable } from './decorators/enumerable';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);
const randomSequenceStr = new Disposable(random)
  .pipe(
    take(8),
    map((value) => String(value)),
    tap((value) => console.log('number', value)),
    enumerable
  )
  .reverse()
  .collect(reduce((acc, value) => `${acc}\nindex=${value[0]}_value=${value[1]}`, ''));

console.log(randomSequenceStr);

// Решить проблему: если вызывать reverse на this._value, а в this._value у нас уже записано значение, обмазанное итераторами,
// то reverse проитерирует это значение и как следствие запустит всё, что прописано в pipe.

// Решение: в pipe не обмазывать, а только созранять список декораторов. А запускать их только при обходе самого экземпляра класса CoreCollection
