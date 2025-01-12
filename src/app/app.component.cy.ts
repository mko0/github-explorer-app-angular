import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

const HEADER_EL = '[data-cy="header"]';
const GITHUB_EL = '[data-cy="github-link"]';
const LINKEDIN_EL = '[data-cy="linkedin-link"]';

describe('AppComponent', () => {
  const setup = () =>
    cy.mount(AppComponent, {
      providers: [provideHttpClient()],
    });

  it('should have title text in header', () => {
    setup();

    cy.get('header')
      .get(HEADER_EL)
      .should('include.text', 'GitHub user repository explorer');
  });

  it('should have GithubUserReposComponent as main content', () => {
    setup();

    cy.get('main').get('gea-github-user-repos').should('exist');
  });

  it('should have GitHub link in footer', () => {
    setup();

    cy.get('footer')
      .get(GITHUB_EL)
      .should('attr', 'href', environment.gitHubUrl);
  });

  it('should have LinkedIn link in footer', () => {
    setup();

    cy.get('footer')
      .get(LINKEDIN_EL)
      .should('attr', 'href', environment.linkedInUrl);
  });
});
