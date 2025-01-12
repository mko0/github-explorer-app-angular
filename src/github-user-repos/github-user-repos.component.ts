import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RequestState } from '../shared/classes/request-state.class';
import { SearchFormValue } from './user-search-form/user-search.form';
import { UserSearchFormComponent } from './user-search-form/user-search-form.component';
import {
  GitHubUserReposService,
  GitHubRepository,
  GitHubBranch,
} from './github-user-repos.service';

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
  imports: [UserSearchFormComponent, AsyncPipe],
  providers: [GitHubUserReposService],
})
export class GithubUserReposComponent {
  protected reposState?: RequestState<GitHubRepository[]>;

  protected branchState: Record<number, RequestState<GitHubBranch[]>> = {};

  constructor(private readonly dataServcie: GitHubUserReposService) {}

  protected onUserSearch(value: SearchFormValue): void {
    const afterFn = (repos: GitHubRepository[]) => {
      this.branchState = {};
      repos.forEach(
        (repo) =>
          (this.branchState[repo.id] = this.dataServcie.getBranchesState(repo)),
      );
    };
    this.reposState = this.dataServcie.getReposState(value.username, afterFn);
  }
}
