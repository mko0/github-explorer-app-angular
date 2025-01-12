import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import {
  GitHubReposService,
  GitHubMinimalRepository,
  GitHubShortBranch,
} from '../api/github-client';
import { RequestState } from '../shared/classes/request-state.class';

export type GitHubRepository = GitHubMinimalRepository;
export type GitHubBranch = GitHubShortBranch;

/** Provides access to GitHub user repositories. */
@Injectable({
  providedIn: 'root',
})
export class GitHubUserReposService {
  constructor(protected readonly reposService: GitHubReposService) {}

  /** Get RequestState object for repository list without forks. */
  getReposState(
    username: string,
    afterRequestFn: (repos: GitHubRepository[]) => void = () => undefined,
  ): RequestState<GitHubRepository[]> {
    const { defaultHandler, errorMessageHandler, create } =
      RequestState.helper();

    return create(() =>
      defaultHandler(() =>
        this.reposService.reposListForUser(username).pipe(
          map((repos) => repos.filter((repo) => !repo.fork)),
          catchError((error: HttpErrorResponse) => {
            if (HttpStatusCode.NotFound === error.status) {
              return errorMessageHandler(`${username} is not a GitHub user.`);
            }

            return throwError(() => error);
          }),
          tap(afterRequestFn),
        ),
      ),
    );
  }

  /** Get RequestState object for branches. */
  getBranchesState(
    repo: GitHubMinimalRepository,
  ): RequestState<GitHubBranch[]> {
    const { defaultHandler, create } = RequestState.helper();

    return create(() =>
      defaultHandler(() =>
        this.reposService.reposListBranches(repo.owner.login, repo.name),
      ),
    );
  }
}
