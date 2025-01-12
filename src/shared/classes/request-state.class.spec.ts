import { lastValueFrom, of, Subject, tap } from 'rxjs';
import { RequestState } from './request-state.class';
import { signal } from '@angular/core';

describe('RequestState', () => {
  describe('static helper()', () => {
    describe('isPending', () => {
      it('should be initialized with false', () => {
        const { isPending } = RequestState.helper();

        expect(isPending()).toBeFalse();
      });
    });

    describe('hasError', () => {
      it('should be initialized with false', () => {
        const { hasError } = RequestState.helper();

        expect(hasError()).toBeFalse();
      });
    });

    describe('errorMessage', () => {
      it('should be initialized with empty string', () => {
        const { errorMessage } = RequestState.helper();

        expect(errorMessage()).toBe('');
      });
    });

    describe('errorMessageHandler()', () => {
      const setup = () => {
        const { isPending, hasError, errorMessage, errorMessageHandler } =
          RequestState.helper();

        return {
          errorMessageHandler,
          isPending,
          hasError,
          errorMessage,
        };
      };

      it('should set hasError to true', () => {
        const { errorMessageHandler, hasError } = setup();
        const spy = spyOn(hasError, 'set').and.callThrough();

        errorMessageHandler('');

        expect(spy).toHaveBeenCalledOnceWith(true);
      });

      it('should set isPending to false', () => {
        const { errorMessageHandler, isPending } = setup();
        const spy = spyOn(isPending, 'set').and.callThrough();

        errorMessageHandler('');

        expect(spy).toHaveBeenCalledOnceWith(false);
      });

      it('should set errorMessage with provided string', () => {
        const msg = 'test_errror_message';
        const { errorMessageHandler, errorMessage } = setup();
        const spy = spyOn(errorMessage, 'set').and.callThrough();

        errorMessageHandler(msg);

        expect(spy).toHaveBeenCalledOnceWith(msg);
      });
    });

    describe('create()', () => {
      const setup = () => {
        const { create, isPending, hasError, errorMessage } =
          RequestState.helper();
        const request$ = of(null);

        return {
          tested: create(() => request$),
          request$,
          isPending,
          hasError,
          errorMessage,
        };
      };

      it('should have assigned request$', () => {
        const { tested, request$ } = setup();

        expect(tested.request$()).toBe(request$);
      });

      it('should have assigned isPending', () => {
        const { tested, isPending } = setup();

        expect(tested.isPending).toBe(isPending);
      });

      it('should have assigned hasError', () => {
        const { tested, hasError } = setup();

        expect(tested.hasError).toBe(hasError);
      });

      it('should have assigned errorMessage', () => {
        const { tested, errorMessage } = setup();

        expect(tested.errorMessage).toBe(errorMessage);
      });

      it('should return RequestState object', () => {
        const { tested } = setup();

        expect(tested instanceof RequestState).toBeTrue();
      });
    });

    describe('defaultHandler()', () => {
      const setup = () => {
        const { isPending, hasError, errorMessage, defaultHandler } =
          RequestState.helper();

        return {
          defaultHandler,
          subject: new Subject<unknown>(),
          isPending,
          hasError,
          errorMessage,
        };
      };

      it('should set isPending to true when request is unresolved', () => {
        const { defaultHandler, subject, isPending } = setup();
        const spy = spyOn(isPending, 'set').and.callThrough();

        defaultHandler(() => subject.asObservable()).subscribe();

        expect(spy).toHaveBeenCalledOnceWith(true);
      });

      it('should set errorMessage to true when request is unresolved', () => {
        const { defaultHandler, subject, errorMessage } = setup();
        const spy = spyOn(errorMessage, 'set').and.callThrough();

        defaultHandler(() => subject.asObservable()).subscribe();

        expect(spy).toHaveBeenCalledOnceWith('');
      });

      it('should return value when request is resolved', (done) => {
        const value = 55;
        const { defaultHandler, subject } = setup();

        defaultHandler(() => subject.asObservable()).subscribe(
          (resolvedValue) => {
            expect(resolvedValue).toBe(value);
            done();
          },
        );

        subject.next(value);
        subject.complete();
      });

      it('should set isPending to false when request is resolved', (done) => {
        const { defaultHandler, subject, isPending } = setup();
        const spy = spyOn(isPending, 'set').and.callThrough();

        defaultHandler(() => subject.asObservable()).subscribe(() => {
          expect(spy).toHaveBeenCalledOnceWith(false);
          done();
        });
        spy.calls.reset();

        subject.next(null);
        subject.complete();
      });

      describe('on error', () => {
        const setupOnError = () => {
          const _ = setup();
          const error = new Error('test');
          const requestError$ = of(1).pipe(
            tap(() => {
              throw error;
            }),
          );

          return { ..._, error, requestError$ };
        };

        it('should re-throw an error', async () => {
          let coughtError: any = null;
          const { defaultHandler, requestError$, error } = setupOnError();

          try {
            await lastValueFrom(defaultHandler(() => requestError$));
          } catch (e) {
            coughtError = e;
          }

          expect(coughtError).toBe(error);
        });

        it('should set isPending to false when request thrown an error', async () => {
          const { defaultHandler, requestError$, isPending } = setupOnError();
          const spy = spyOn(isPending, 'set').and.callThrough();

          try {
            await lastValueFrom(
              defaultHandler(() => {
                spy.calls.reset();

                return requestError$;
              }),
            );
          } catch (e) {}

          expect(spy).toHaveBeenCalledOnceWith(false);
        });

        it('should set hasError to true when request thrown an error', async () => {
          const { defaultHandler, requestError$, hasError } = setupOnError();
          const spy = spyOn(hasError, 'set').and.callThrough();

          try {
            await lastValueFrom(
              defaultHandler(() => {
                spy.calls.reset();

                return requestError$;
              }),
            );
          } catch (e) {}

          expect(spy).toHaveBeenCalledOnceWith(true);
        });
      });
    });
  });

  describe('constructor()', () => {
    const setup = () => {
      const isPending = signal(false);
      const hasError = signal(false);
      const errorMessage = signal('');
      const request$ = of(null);
      const createRequestSpy = jasmine.createSpy();
      createRequestSpy.and.returnValue(request$);

      return { isPending, hasError, errorMessage, request$, createRequestSpy };
    };

    it('should assign request$ using createRequest function', () => {
      const { createRequestSpy, isPending, hasError, errorMessage, request$ } =
        setup();

      const tested = new RequestState(
        createRequestSpy,
        isPending,
        hasError,
        errorMessage,
      );

      expect(createRequestSpy).toHaveBeenCalledOnceWith();
      expect(tested.request$()).toBe(request$);
    });

    it('should re-assign isPending', () => {
      const { createRequestSpy, isPending, hasError, errorMessage } = setup();

      const tested = new RequestState(
        createRequestSpy,
        isPending,
        hasError,
        errorMessage,
      );

      expect(tested.isPending).toBe(isPending);
    });

    it('should re-assign hasError', () => {
      const { createRequestSpy, isPending, hasError, errorMessage } = setup();

      const tested = new RequestState(
        createRequestSpy,
        isPending,
        hasError,
        errorMessage,
      );

      expect(tested.hasError).toBe(hasError);
    });

    it('should re-assign errorMessage', () => {
      const { createRequestSpy, isPending, hasError, errorMessage } = setup();

      const tested = new RequestState(
        createRequestSpy,
        isPending,
        hasError,
        errorMessage,
      );

      expect(tested.errorMessage).toBe(errorMessage);
    });
  });

  describe('retry()', () => {
    const setup = () => {
      const isPending = signal(false);
      const hasError = signal(false);
      const errorMessage = signal('');
      const newRequest$ = of(2);
      const createRequestSpy = jasmine.createSpy();
      createRequestSpy.and.returnValues(of(1), newRequest$);
      const tested = new RequestState(
        createRequestSpy,
        isPending,
        hasError,
        errorMessage,
      );
      createRequestSpy.calls.reset();

      return {
        tested,
        isPending,
        hasError,
        errorMessage,
        newRequest$,
        createRequestSpy,
      };
    };

    it('should set hasError to false', () => {
      const { tested, hasError } = setup();
      const spy = spyOn(hasError, 'set').and.callThrough();

      tested.retry();

      expect(spy).toHaveBeenCalledOnceWith(false);
    });

    it('should set isPending to false', () => {
      const { tested, isPending } = setup();
      const spy = spyOn(isPending, 'set').and.callThrough();

      tested.retry();

      expect(spy).toHaveBeenCalledOnceWith(false);
    });

    it('should set errorMessage to empty string', () => {
      const { tested, errorMessage } = setup();
      const spy = spyOn(errorMessage, 'set').and.callThrough();

      tested.retry();

      expect(spy).toHaveBeenCalledOnceWith('');
    });

    it('should set request$ wit', () => {
      const { tested, createRequestSpy, newRequest$ } = setup();

      tested.retry();

      expect(createRequestSpy).toHaveBeenCalledOnceWith();
      expect(tested.request$()).toBe(newRequest$);
    });
  });
});
