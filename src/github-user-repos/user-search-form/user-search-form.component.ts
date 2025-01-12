import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '../../shared/components/control-error/control-error.component';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { SearchForm, SearchFormValue } from './user-search.form';

/**
 * User search form view.
 *
 * @example
 * ```html
 *  <gea-user-search-form (userSearch)="onUserSearch($event)" />
 * ```
 */
@Component({
  selector: 'gea-user-search-form',
  templateUrl: './user-search-form.component.html',
  imports: [ReactiveFormsModule, ControlErrorComponent, ButtonDirective],
})
export class UserSearchFormComponent {
  readonly form = input<SearchForm>(new SearchForm());

  readonly userSearch = output<SearchFormValue>();

  protected onSubmit(): void {
    this.userSearch.emit(this.form().value as SearchFormValue);
  }
}
