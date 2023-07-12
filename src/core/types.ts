import { CoreCollection } from './containers/CoreCollection';

export type TOperation<T, R> = (arg: Iterable<T>) => Iterable<R>;

export type TPipeMethod<T> = {
  (): CoreCollection<T>;
  <A>(op1: TOperation<T, A>): CoreCollection<A>;
  <A, B>(op1: TOperation<T, A>, op2: TOperation<A, B>): CoreCollection<B>;
  <A, B, C>(op1: TOperation<T, A>, op2: TOperation<A, B>, op3: TOperation<B, C>): CoreCollection<C>;
  <A, B, C, D>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>
  ): CoreCollection<D>;
  <A, B, C, D, E>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>
  ): CoreCollection<E>;
  <A, B, C, D, E, F>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>
  ): CoreCollection<F>;
  <A, B, C, D, E, F, G>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>
  ): CoreCollection<G>;
  <A, B, C, D, E, F, G, H>(
    op1: TOperation<T, A>,
    op2: TOperation<A, B>,
    op3: TOperation<B, C>,
    op4: TOperation<C, D>,
    op5: TOperation<D, E>,
    op6: TOperation<E, F>,
    op7: TOperation<F, G>,
    op8: TOperation<G, H>
  ): CoreCollection<H>;
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
  ): CoreCollection<I>;
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
  ): CoreCollection<J>;
};
