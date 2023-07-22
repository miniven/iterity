/**
 * Обходит коллекцию и вызывает коллбэк для каждого элемента коллекции
 *
 * @example
 *   forEach([1, 2, 3], (value) => {
 *     console.log(value);
 *   });
 * @param iterable Итерируемый объект
 * @param callback Коллбэк, который будет вызван для каждого элемента
 */
export function forEach<T>(iterable: Iterable<T>, callback: (value: T, iterable: Iterable<T>) => void) {
  for (const value of iterable) {
    callback(value, iterable);
  }
}

/**
 * Обходит коллекцию с асинхронным итератором и вызывает коллбэк для каждого элемента коллекции
 *
 * @example
 *   forEachAsync(new AsyncCollection([1, 2, 3]), (value) => {
 *     console.log(value);
 *   });
 * @param iterable Итерируемый объект
 * @param callback Коллбэк, который будет вызван для каждого элемента
 */
export async function forEachAsync<T>(
  iterable: AsyncIterable<T>,
  callback: (value: T, iterable: AsyncIterable<T>) => void
) {
  for await (const value of iterable) {
    callback(value, iterable);
  }
}
