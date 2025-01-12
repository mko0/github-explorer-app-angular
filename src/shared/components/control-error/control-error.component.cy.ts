import { signal } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { ControlErrorComponent } from './control-error.component';

export const ERROR_MESSAGE_EL = '[data-cy="error-message"]';
const ERROR_INPUT_REQUIRED = 'NG0950';
const testValidator =
  (message: string) =>
  (control: AbstractControl): { test: string } | null =>
    Validators.required(control) ? { test: message } : null;

describe('ControlErrorComponent', () => {
  const setup = () => {
    const errorMessage = 'test_error_message';
    const control = new FormControl('', testValidator(errorMessage));
    cy.mount(ControlErrorComponent, {
      componentProperties: {
        control: signal(control) as any,
      },
    });

    return { control, errorMessage };
  };

  it('should display an error message when control is invalid and touched', () => {
    const { control, errorMessage } = setup();

    control.markAsTouched();

    cy.get(ERROR_MESSAGE_EL).should('include.text', errorMessage);
  });

  it('should not display an error message when a control is invalid and has not been touched', () => {
    setup();

    cy.get(ERROR_MESSAGE_EL).should('not.exist');
  });

  it('should not display an error message when control is touched and has not been invalid', () => {
    const { control } = setup();

    control.setValue('valid_value');
    control.markAsTouched();

    cy.get(ERROR_MESSAGE_EL).should('not.exist');
  });

  it('should throw an error that input is required', () => {
    cy.on('error', (err) => {
      expect(err.message).to.includes(ERROR_INPUT_REQUIRED);

      return false;
    });

    cy.mount(ControlErrorComponent);
  });
});
