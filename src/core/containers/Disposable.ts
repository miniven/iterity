import { breakable } from '../../decorators/breakable';
import { CoreCollection } from './CoreCollection';

import type { TPipeMethod, TOperation } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с перебираемой коллекцией.
 * Перебор коллекции нельзя продолжить после вызова break.
 *
 * @class Disposable<T>
 */
export class Disposable<T> extends CoreCollection<T> {
  protected _getTransformer(): (iterable: Iterable<T>) => Iterable<T> {
    return breakable;
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Disposable<any> => {
    return new Disposable(operations.reduce((value, func) => func(value), this._value));
  };

  transform<R>(transformer: (value: Iterable<T>) => R | Iterable<R> | CoreCollection<R>): CoreCollection<R> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof CoreCollection) {
      return nextValue;
    }

    return new Disposable(nextValue);
  }
}
