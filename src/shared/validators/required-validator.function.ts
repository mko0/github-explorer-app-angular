import { AbstractControl, Validators } from '@angular/forms';

/**
 * Validator that requires the control have a non-empty value.
 *
 * @example
 * ```typescript
 * const user = new FormControl('', requiredValidator('User'));
 * console.log(control.errors); // {required: 'User is required'}
 * ```
 */
export function requiredValidator(propertyName = 'Value') {
  const required = `${propertyName} is required.`;
  return (control: AbstractControl): { required: string } | null =>
    Validators.required(control) ? { required } : null;
}
