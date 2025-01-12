import { FormControl } from '@angular/forms';
import { requiredValidator } from './required-validator.function';

const DEFAULT_ERROR_MESSAGE = { required: 'Value is required.' };

describe('requiredValidator()', () => {
  it('should return default error message when property name is not provided', () => {
    const control = new FormControl(null);

    const validate = requiredValidator();

    expect(validate(control)).toEqual(DEFAULT_ERROR_MESSAGE);
  });

  it('should return error message with custom property name', () => {
    const propertyName = 'Username';
    const control = new FormControl(null);

    const validate = requiredValidator(propertyName);

    expect(validate(control)).toEqual({
      required: `${propertyName} is required.`,
    });
  });

  describe('case', () => {
    [
      { value: null, returns: DEFAULT_ERROR_MESSAGE },
      { value: undefined, returns: DEFAULT_ERROR_MESSAGE },
      { value: '', returns: DEFAULT_ERROR_MESSAGE },
      { value: 'value', returns: null },
      { value: false, returns: null },
      { value: 1, returns: null },
      { value: NaN, returns: null },
    ].forEach(({ value, returns }, index) =>
      it(`[${index}] should return expected error message when value is equal to "${value}"`, () => {
        const control = new FormControl(value);

        const validate = requiredValidator();

        expect(validate(control)).toEqual(returns);
      }),
    );
  });
});
