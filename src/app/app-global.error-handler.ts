import { ErrorHandler, Injectable } from '@angular/core';

/** Handle errors globally in the application. */
@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {
  static readonly MESSAGE_PREFIX = '[Error]:';

  static readonly MESSAGE_DEFAULT = 'Undefined app error.';

  handleError(error: unknown) {
    const { MESSAGE_PREFIX } = AppGlobalErrorHandler;
    const message =
      (error as Error)?.message || AppGlobalErrorHandler.MESSAGE_DEFAULT;
    console.error(MESSAGE_PREFIX, error);
    alert(`${MESSAGE_PREFIX} ${message}`);
  }
}
