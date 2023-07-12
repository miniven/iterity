export function sum(iterable: Iterable<number>): number {
  let result = 0;

  for (const num of iterable) {
    result += num;
  }

  return result;
}
