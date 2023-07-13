import { breakable } from '../../decorators/breakable';
import { reverse } from '../../modifiers/reverse';
import { CoreCollection } from './CoreCollection';

import type { TPipeMethod, TOperation } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с перебираемой коллекцией.
 * Перебор коллекции нельзя продолжить после вызова break.
 *
 * @class Disposable<T>
 */
export class Disposable<T> extends CoreCollection<T> {
  protected _getContainerTypeModifier(): (iterable: Iterable<T>) => IterableIterator<T> {
    return breakable;
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Disposable<any> => {
    return new Disposable(operations.reduce((value, func) => func(value), CoreCollection.makeIterable(this._value)));
  };

  transform(transformer: (value: T | Iterable<T>) => T | Iterable<T> | CoreCollection<T>): CoreCollection<T> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof CoreCollection) {
      return nextValue;
    }

    return new Disposable(nextValue);
  }
}
