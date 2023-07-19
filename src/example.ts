import { from } from './core';
import { slice } from './limitators';

function* randomGenerator(min = 0, max = 1) {
  while (true) {
    yield Math.floor(Math.random() * (max - min)) + min;
  }
}

const random = randomGenerator(5, 10);

(async function () {
  const collection = from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(slice(0, 7));

  for (const number of collection) {
    console.log(number);
  }
})();
