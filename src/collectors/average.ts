export function average(iterable: Iterable<number>): number {
  let sum = 0;
  let count = 0;

  for (const num of iterable) {
    sum += num;
    count++;
  }

  return sum / count;
}
