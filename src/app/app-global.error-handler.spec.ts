import { AppGlobalErrorHandler } from './app-global.error-handler';

describe('AppGlobalErrorHandler', () => {
  describe('handleError()', () => {
    it('should call console.error with error object', () => {
      const error = { message: 'Err!' };
      const tested = new AppGlobalErrorHandler();
      const spy = spyOn(window.console, 'error');

      tested.handleError(error);

      expect(spy).toHaveBeenCalledOnceWith(
        AppGlobalErrorHandler.MESSAGE_PREFIX,
        error,
      );
    });

    it('should open alert window with error message', () => {
      const error = { message: 'Err!' };
      const tested = new AppGlobalErrorHandler();
      const spy = spyOn(window, 'alert');

      tested.handleError(error);

      expect(spy).toHaveBeenCalledOnceWith(
        `${AppGlobalErrorHandler.MESSAGE_PREFIX} ${error.message}`,
      );
    });

    it('should open alert window with default message when error object do not have message property', () => {
      const tested = new AppGlobalErrorHandler();
      const spy = spyOn(window, 'alert');
      const { MESSAGE_PREFIX, MESSAGE_DEFAULT } = AppGlobalErrorHandler;

      tested.handleError({});

      expect(spy).toHaveBeenCalledOnceWith(
        `${MESSAGE_PREFIX} ${MESSAGE_DEFAULT}`,
      );
    });
  });
});
