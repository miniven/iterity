/**
 * Объединяет все элементы коллекции строк в одну строку
 *
 * @param separator Разделитель между строками
 * @returns Функция объединения
 */
export function join(separator: string = '') {
  return function (iterable: Iterable<string>): string {
    return [...iterable].join(separator);
  };
}
