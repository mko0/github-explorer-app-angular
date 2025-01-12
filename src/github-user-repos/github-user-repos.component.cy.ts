import { provideHttpClient } from '@angular/common/http';
import { GitHubApiConfiguration } from '../api/github-client';
import { ERROR_MESSAGE_EL } from '../shared/components/control-error/control-error.component.cy';
import { GithubUserReposComponent } from './github-user-repos.component';

const USERNAME_INPUT_EL = '[data-cy="username-input"]';
const SEARCH_BUTTOM_EL = '[data-cy="search-button"]';
const REPO_HEADER_NAME_EL = '[data-cy="repository-header-name"]';
const REPO_HEADER_OWNER_EL = '[data-cy="repository-header-owner"]';
const REPO_ID_EL = (id: number) => `[data-cy="repository-id:${id}"]`;
const REPO_NAME_EL = `[data-cy="repository-name"]`;
const REPO_OWNER_EL = `[data-cy="repository-owner"]`;
const BRANCH_INDEX_EL = (i: number) => `[data-cy="branch-index:${i}"]`;
const BRANCH_NAME_EL = '[data-cy="branch-name"]';
const BRANCH_COMMIT_SHA_EL = '[data-cy="branch-commit-sha"]';
const API_URL = 'https://test.api';
const provideGitHubApiConfiguration = () => ({
  provide: GitHubApiConfiguration,
  useFactory: () => new GitHubApiConfiguration({ basePath: API_URL }),
});

describe('GithubUserReposComponent', () => {
  describe('As an application user I would like to type a username', () => {
    const setup = () =>
      cy.mount(GithubUserReposComponent, {
        providers: [provideHttpClient(), provideGitHubApiConfiguration()],
      });

    it('should be allow to type a username and search button should’t be disabled', () => {
      const username = 'test_username';
      setup();

      cy.get(USERNAME_INPUT_EL).type(username);

      cy.get(SEARCH_BUTTOM_EL).should('have.prop', 'disabled', false);
    });

    it('should be allow to type a username and error should’t exist', () => {
      const username = 'test_username';
      setup();

      cy.get(USERNAME_INPUT_EL).type(username);

      cy.get(ERROR_MESSAGE_EL).should('not.exist');
    });

    it('should display validation error for an empty username', () => {
      setup();

      cy.get(USERNAME_INPUT_EL).focus().type('test').clear().blur();

      cy.get(ERROR_MESSAGE_EL).should('include.text', 'Username is required.');
    });

    it('should disable search button for an empty username', () => {
      setup();

      cy.get(USERNAME_INPUT_EL).focus().type('test').clear().blur();

      cy.get(SEARCH_BUTTOM_EL).should('have.prop', 'disabled', true);
    });
  });

  describe('As an application user, given a username I would like to see a list of user’s github repositories', () => {
    const setup = () => {
      const username = 'test_username';
      cy.mount(GithubUserReposComponent, {
        providers: [provideHttpClient(), provideGitHubApiConfiguration()],
      });
      cy.get(USERNAME_INPUT_EL).type(username);
      const repoName1 = 'repo_1_name';
      const repoName3 = 'repo_3_name';
      const repos = [
        {
          id: 1,
          name: repoName1,
          owner: {
            login: username,
          },
          fork: false,
        },
        {
          id: 2,
          name: 'repo_2_name',
          owner: {
            login: username,
          },
          fork: true,
        },
        {
          id: 3,
          name: repoName3,
          owner: {
            login: username,
          },
          fork: false,
        },
      ];
      const reposWithOutForks = repos.filter((repo) => !repo.fork);
      const branches = {
        [1 as number]: [
          {
            name: `${repoName1}:branch_1_name`,
            commit: { sha: `${repoName1}:branch_1_commit_sha` },
          },
          {
            name: `${repoName1}:branch_2_name`,
            commit: { sha: `${repoName1}:branch_2_commit_sha` },
          },
        ],
        [3 as number]: [
          {
            name: `${repoName3}:branch_1_name`,
            commit: { sha: `${repoName3}:branch_1_commit_sha` },
          },
        ],
      };
      cy.intercept('GET', `${API_URL}/users/${username}/repos`, {
        statusCode: 200,
        body: repos,
      })
        .intercept(
          'GET',
          `${API_URL}/repos/${username}/${repoName1}/branches`,
          {
            statusCode: 200,
            body: branches[1],
          },
        )
        .intercept(
          'GET',
          `${API_URL}/repos/${username}/${repoName3}/branches`,
          {
            statusCode: 200,
            body: branches[3],
          },
        );
      cy.get(SEARCH_BUTTOM_EL).click();

      return {
        username,
        repos,
        reposWithOutForks,
        branches,
      };
    };

    it('should display user repositories, not a fork ones', () => {
      const { reposWithOutForks } = setup();

      reposWithOutForks.forEach((repo) =>
        cy.get(REPO_ID_EL(repo.id)).should('exist'),
      );
    });

    describe('each displayed repository result', () => {
      it('should include repository name', () => {
        const { reposWithOutForks } = setup();

        cy.get(REPO_HEADER_NAME_EL).should('exist');
        reposWithOutForks.forEach((repo) =>
          cy
            .get(REPO_ID_EL(repo.id))
            .get(REPO_NAME_EL)
            .should('include.text', repo.name),
        );
      });

      it('should include login of repository owner', () => {
        const { reposWithOutForks } = setup();

        cy.get(REPO_HEADER_OWNER_EL).should('exist');
        reposWithOutForks.forEach((repo) =>
          cy
            .get(REPO_ID_EL(repo.id))
            .get(REPO_OWNER_EL)
            .should('include.text', repo.owner.login),
        );
      });

      it('should include branch name for each branch', () => {
        const { reposWithOutForks, branches } = setup();

        reposWithOutForks.forEach((repo) =>
          branches[repo.id].forEach((branch, i) =>
            cy
              .get(REPO_ID_EL(repo.id))
              .get(BRANCH_INDEX_EL(i))
              .get(BRANCH_NAME_EL)
              .should('include.text', branch.name),
          ),
        );
      });

      it('should include branch last commit sha for each branch', () => {
        const { reposWithOutForks, branches } = setup();

        reposWithOutForks.forEach((repo) =>
          branches[repo.id].forEach((branch, i) =>
            cy
              .get(REPO_ID_EL(repo.id))
              .get(BRANCH_INDEX_EL(i))
              .get(BRANCH_COMMIT_SHA_EL)
              .should('include.text', branch.commit.sha),
          ),
        );
      });
    });
  });
});
