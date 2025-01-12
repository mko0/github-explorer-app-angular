import { Component } from '@angular/core';
import { SearchFormValue } from './user-search-form/user-search.form';
import { UserSearchFormComponent } from './user-search-form/user-search-form.component';

/**
 * GitHub user repositories search view.
 *
 * @example
 * ```html
 *  <gea-github-user-repos/>
 * ```
 */
@Component({
  selector: 'gea-github-user-repos',
  templateUrl: './github-user-repos.component.html',
  imports: [UserSearchFormComponent],
})
export class GithubUserReposComponent {
  onUserSearch(value: SearchFormValue): void {
    console.debug(value);
  }
}
