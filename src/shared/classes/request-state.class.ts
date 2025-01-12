import { Signal, signal, WritableSignal } from '@angular/core';
import {
  catchError,
  EMPTY,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

/**
 * Manages the state of HTTP request.
 *
 * @example
 * ```ts
 *  const { defaultHandler, create } = RequestState.helper();
 *  const requestState = create(() => defaultHandler(() => this.service.getHttp()));
 * ```
 */
export class RequestState<T> {
  /** Provides helper functions for creation of RequestState object and handling request. */
  static helper(): {
    /** Indicates the state of the request execution. */
    isPending: WritableSignal<boolean>;
    /** Indicates the state of the request error. */
    hasError: WritableSignal<boolean>;
    /** A message that describes the context of the error to the user. */
    errorMessage: WritableSignal<string>;
    /**
     * Default handler for HTTP request.
     *
     * @param request$ - Performs HTTP request.
     */
    defaultHandler: <T>(request$: () => Observable<T>) => Observable<T>;
    /**
     * Default error message handler.
     *
     * @param message - A message that describes the context of the error to the user.
     */
    errorMessageHandler: (message: string) => Observable<never>;
    /**
     * Creates RequestState instance.
     *
     * @param createRequest - Creates HTTP request.
     */
    create: <T>(createRequest$: () => Observable<T>) => RequestState<T>;
  } {
    const isPending = signal(false);
    const hasError = signal(false);
    const errorMessage = signal('');

    return {
      isPending,
      hasError,
      errorMessage,
      errorMessageHandler: (message: string) => {
        hasError.set(true);
        isPending.set(false);
        errorMessage.set(message);

        return EMPTY;
      },
      defaultHandler: <T>(request$: () => Observable<T>) =>
        of(null).pipe(
          tap(() => {
            isPending.set(true);
            errorMessage.set('');
          }),
          switchMap(() => request$()),
          tap(() => isPending.set(false)),
          catchError((error: Error) => {
            hasError.set(true);
            isPending.set(false);

            return throwError(() => error);
          }),
        ),
      create: <T>(createRequest: () => Observable<T>) =>
        new RequestState(createRequest, isPending, hasError, errorMessage),
    };
  }

  /** HTTP request. */
  readonly request$: Signal<Observable<T>>;

  /** Indicates the state of the request execution. */
  readonly isPending: Signal<boolean>;

  /** Indicates the state of the request error. */
  readonly hasError: Signal<boolean>;

  /** A message that describes the context of the error to the user. */
  readonly errorMessage: Signal<string>;

  protected readonly _request$: WritableSignal<Observable<T>>;

  constructor(
    protected createRequest$: () => Observable<T>,
    protected readonly _isPending: WritableSignal<boolean>,
    protected readonly _hasError: WritableSignal<boolean>,
    protected readonly _errorMessage: WritableSignal<string>,
  ) {
    this.isPending = _isPending;
    this.hasError = _hasError;
    this.errorMessage = _errorMessage;
    this._request$ = signal(this.createRequest$());
    this.request$ = this._request$;
  }

  /** Retries the HTTP request. */
  retry(): void {
    this._hasError.set(false);
    this._errorMessage.set('');
    this._isPending.set(false);
    this._request$.set(this.createRequest$());
  }
}
