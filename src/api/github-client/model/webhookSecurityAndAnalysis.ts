/**
 * GitHub v3 REST API
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GitHubOrganizationSimpleWebhooks } from './organizationSimpleWebhooks';
import { GitHubWebhookSecurityAndAnalysisChanges } from './webhookSecurityAndAnalysisChanges';
import { GitHubSimpleInstallation } from './simpleInstallation';
import { GitHubEnterpriseWebhooks } from './enterpriseWebhooks';

export interface GitHubWebhookSecurityAndAnalysis {
  changes: GitHubWebhookSecurityAndAnalysisChanges;
  enterprise?: GitHubEnterpriseWebhooks;
  installation?: GitHubSimpleInstallation;
  organization?: GitHubOrganizationSimpleWebhooks;
}