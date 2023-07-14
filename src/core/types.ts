import type { AsyncCollection } from './containers/AsyncCollection';
import type { Collection } from './containers/Collection';

export type TOperation<T, R> = (arg: Iterable<T>) => Iterable<R>;

export type TAsyncOperation<T, R> = (arg: AsyncIterable<T>) => AsyncIterable<T>;

export type TPipeMethod<T> = {
  (): Collection<T>;
  <A>(op1: TOperation<T, A>): Collection<A>;
  <A, B>(op1: TOperation<T, A>, op2: TOperation<A, B>): Collection<B>;
  <A, B, C>(op1: TOperation<T, A>, op2: TOperation<A, B>, op3: TOperation<B, C>): Collection<C>;
  <A, B, C, D>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>
  ): Collection<D>;
  <A, B, C, D, E>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>
  ): Collection<E>;
  <A, B, C, D, E, F>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>
  ): Collection<F>;
  <A, B, C, D, E, F, G>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>
  ): Collection<G>;
  <A, B, C, D, E, F, G, H>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>,
    op8: TOperation<G, H>
  ): Collection<H>;
  <A, B, C, D, E, F, G, H, I>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>,
    op8: TOperation<G, H>,
    op9: TOperation<H, I>
  ): Collection<I>;
  <A, B, C, D, E, F, G, H, I, J>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>,
    op8: TOperation<G, H>,
    op9: TOperation<H, I>,
    op10: TOperation<I, J>
  ): Collection<J>;
};

export type TAsyncPipeMethod<T> = {
  (): AsyncCollection<T>;
  <A>(op1: TAsyncOperation<T, A>): AsyncCollection<A>;
  <A, B>(op1: TAsyncOperation<T, A>, op2: TAsyncOperation<A, B>): AsyncCollection<B>;
  <A, B, C>(op1: TAsyncOperation<T, A>, op2: TAsyncOperation<A, B>, op3: TAsyncOperation<B, C>): AsyncCollection<C>;
  <A, B, C, D>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>
  ): AsyncCollection<D>;
  <A, B, C, D, E>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>
  ): AsyncCollection<E>;
  <A, B, C, D, E, F>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>,
    op6: TAsyncOperation<E, F>
  ): AsyncCollection<F>;
  <A, B, C, D, E, F, G>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>,
    op6: TAsyncOperation<E, F>,
    op7: TAsyncOperation<F, G>
  ): AsyncCollection<G>;
  <A, B, C, D, E, F, G, H>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>,
    op6: TAsyncOperation<E, F>,
    op7: TAsyncOperation<F, G>,
    op8: TAsyncOperation<G, H>
  ): AsyncCollection<H>;
  <A, B, C, D, E, F, G, H, I>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>,
    op6: TAsyncOperation<E, F>,
    op7: TAsyncOperation<F, G>,
    op8: TAsyncOperation<G, H>,
    op9: TAsyncOperation<H, I>
  ): AsyncCollection<I>;
  <A, B, C, D, E, F, G, H, I, J>(
    op1: TAsyncOperation<T, A>,
    op2: TAsyncOperation<A, B>,
    op3: TAsyncOperation<B, C>,
    op4: TAsyncOperation<C, D>,
    op5: TAsyncOperation<D, E>,
    op6: TAsyncOperation<E, F>,
    op7: TAsyncOperation<F, G>,
    op8: TAsyncOperation<G, H>,
    op9: TAsyncOperation<H, I>,
    op10: TAsyncOperation<I, J>
  ): AsyncCollection<J>;
};

export interface ICollection<T> {
  /**
   * Метод для изменения типа контейнера. Изначально значение хранится в контейнере AsyncCollection<T>, но этот метод
   * позволяет изменить тип контейнера, например, на Collection<T>, или на обыкновенный массив
   *
   * @description Метод возвращает контейнерный тип: либо тот же, либо новый. Это способ передать значнеие от одного контейнера к другому.
   *
   * @param {Function} transformer Функция для возврата нового контейнера.
   * @returns Новый контейнер, хранящий значение
   */
  transform(
    transformer: (value: T | Iterable<T> | AsyncIterable<T>) => T | Iterable<T> | AsyncIterable<T> | ICollection<T>
  ): ICollection<T>;

  /**
   * Метод для передачи функций, которые преобразовывают значения коллекции, или меняют поведение при итерации
   *
   * @description Метод возвращает тот же контейнерный тип, но с новым значением. Это способ изменить значение в контейнере.
   *
   * @param {Function} operations Функции для преобразования асинхронной коллекции
   * @returns {AsyncCollection} Контейнер, содержащий преобразованную коллекцию
   */
  pipe: TPipeMethod<T> | TAsyncPipeMethod<T>;

  /**
   * Функция для преобразования коллекции к конечному значению и возврата этого значения
   *
   * @description Метод возвращает значение, каким оно было возвращено из функции. Это способ привести контейнерный тип к произвольному типу.
   *
   * @param {Function} collector Функция-коллектор для преобразования коллекции к одному значению
   * @returns Конечное значение
   */
  collect<R>(collector: (iterable: Iterable<T> | AsyncIterable<T>) => R): R;
}
