import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Error message view for AbstractControl.
 *
 * @example
 * ```html
 *  <gea-control-error [control]="form.controls.user"/>
 * ```
 */
@Component({
  selector: 'gea-control-error',
  templateUrl: './control-error.component.html',
})
export class ControlErrorComponent {
  readonly control = input.required<AbstractControl>();

  protected readonly errorMessage = computed(
    () => Object.values(this.control()?.errors as Record<string, string>)[0],
  );
}
