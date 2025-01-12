import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { environment } from '../environments/environment';
import { GitHubApiConfiguration } from '../api/github-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    {
      provide: GitHubApiConfiguration,
      useFactory: () =>
        new GitHubApiConfiguration({ basePath: environment.gitHubApiUrl }),
    },
  ],
};
