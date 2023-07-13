/**
 * Вычисляет среднее значение элементов коллекции и возвращает число
 *
 * @param iterable Перебираемая коллекция
 * @returns Среднее значение всех чисел коллекции
 */
export function average(iterable: Iterable<number>): number {
  let sum = 0;
  let count = 0;

  for (const num of iterable) {
    sum += num;
    count++;
  }

  return sum / count;
}
