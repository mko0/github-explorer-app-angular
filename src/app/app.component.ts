import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { GithubUserReposComponent } from '../github-user-repos/github-user-repos.component';

/**
 * Application root component.
 *
 * @example
 * ```html
 *  <gea-root/>
 * ```
 */
@Component({
  selector: 'gea-root',
  templateUrl: './app.component.html',
  imports: [GithubUserReposComponent],
})
export class AppComponent {
  readonly externalLink = {
    gitHub: environment.gitHubUrl,
    linkedIn: environment.linkedInUrl,
  };
}
