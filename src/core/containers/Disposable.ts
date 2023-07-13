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

  reverse(): Disposable<T> {
    return new Disposable(reverse(CoreCollection.makeIterable(this._value)));
  }

  transform<R>(transformer: (value: T | Iterable<T>) => R | Iterable<R> | CoreCollection<R>): CoreCollection<R> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof CoreCollection) {
      return nextValue;
    }

    return new Disposable(nextValue);
  }
}
