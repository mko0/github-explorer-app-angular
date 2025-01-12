import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RequestState } from '../../shared/classes/request-state.class';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { GitHubBranch } from '../github-user-repos.service';

/**
 * Branch list view.
 *
 * @example
 * ```html
 *  <gea-branch-list [state]="state"/>
 * ```
 */
@Component({
  selector: 'gea-branch-list',
  templateUrl: './branch-list.component.html',
  imports: [AsyncPipe, LoadingComponent, ButtonDirective],
})
export class BranchListComponent {
  readonly state = input.required<RequestState<GitHubBranch[]>>();
}
