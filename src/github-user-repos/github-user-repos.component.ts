import { Component } from '@angular/core';
import { RequestState } from '../shared/classes/request-state.class';
import { SearchFormValue } from './user-search-form/user-search.form';
import { UserSearchFormComponent } from './user-search-form/user-search-form.component';
import {
  GitHubUserReposService,
  GitHubRepository,
  GitHubBranch,
} from './github-user-repos.service';
import { RepositoryListComponent } from './repostitory-list/repository-list.component';
import { BranchListComponent } from './branch-list/branch-list.component';

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
  imports: [
    UserSearchFormComponent,
    RepositoryListComponent,
    BranchListComponent,
  ],
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
