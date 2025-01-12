import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { RequestState } from '../../shared/classes/request-state.class';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { GitHubRepository } from '../github-user-repos.service';

/**
 * Repository list view.
 *
 * @example
 * ```html
 *  <gea-repository-list [state]="state">
 *    <ng-template #details let-repo>
 *      ...
 *    </ng-template>
 *  </gea-repository-list>
 * ```
 */
@Component({
  selector: 'gea-repository-list',
  templateUrl: './repository-list.component.html',
  imports: [AsyncPipe, NgTemplateOutlet, LoadingComponent],
})
export class RepositoryListComponent {
  readonly state = input.required<RequestState<GitHubRepository[]>>();

  @ContentChild('details') detailsRef?: TemplateRef<{
    $implicit: GitHubRepository;
  }>;
}
