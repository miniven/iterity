import { resumable } from '../../decorators/resumable';
import { CoreCollection } from './CoreCollection';

import type { TOperation, TPipeMethod } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с перебираемой коллекцией.
 * Перебор коллекции можно продолжить после вызова break.
 *
 * @class Resumable<T>
 */
export class Resumable<T> extends CoreCollection<T> {
  protected _getTransformer(): (iterable: Iterable<T>) => Iterable<T> {
    return resumable;
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Resumable<any> => {
    return new Resumable(operations.reduce((value, func) => func(value), this._value));
  };

  transform<R>(transformer: (value: Iterable<T>) => R | Iterable<R> | CoreCollection<R>): CoreCollection<R> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof CoreCollection) {
      return nextValue;
    }

    return new Resumable(nextValue);
  }
}
