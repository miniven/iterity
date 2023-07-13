import { resumable } from '../../decorators/resumable';
import { reverse } from '../../modifiers/reverse';
import { CoreCollection } from './CoreCollection';

import type { TOperation, TPipeMethod } from '../types';

/**
 * Контейнер для значения, с которым необходимо работать как с перебираемой коллекцией.
 * Перебор коллекции можно продолжить после вызова break.
 *
 * @class Resumable<T>
 */
export class Resumable<T> extends CoreCollection<T> {
  protected _getContainerTypeModifier(): (iterable: Iterable<T>) => IterableIterator<T> {
    return resumable;
  }

  pipe: TPipeMethod<T> = (...operations: Array<TOperation<any, any>>): Resumable<any> => {
    return new Resumable(operations.reduce((value, func) => func(value), CoreCollection.makeIterable(this._value)));
  };

  transform(transformer: (value: T | Iterable<T>) => T | Iterable<T> | CoreCollection<T>): CoreCollection<T> {
    const nextValue = transformer(this._value);

    if (nextValue instanceof CoreCollection) {
      return nextValue;
    }

    return new Resumable(nextValue);
  }
}
