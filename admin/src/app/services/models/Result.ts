export type RequestState = 'initial' | 'loading' | 'success' | 'submitted' | 'error' | 'actioned';

export interface IRequestResult<TResult = any, TError = any> {
  state: RequestState;
  value?: TResult;
  error?: TError;
}
