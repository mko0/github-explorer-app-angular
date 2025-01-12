import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  const ICON_EL = '[data-cy="progress-icon"]';
  const iconClass = 'material-symbols-outlined';
  const spinClass = 'animate-spin';

  it('should display progress icon', () => {
    cy.mount(LoadingComponent);

    cy.get(ICON_EL).should('include.text', 'progress_activity');
  });

  it('should progress icon have icon class', () => {
    cy.mount(LoadingComponent);

    cy.get(ICON_EL).should('have.class', iconClass);
  });

  it('should progress icon have spin class', () => {
    cy.mount(LoadingComponent);

    cy.get(ICON_EL).should('have.class', spinClass);
  });
});
