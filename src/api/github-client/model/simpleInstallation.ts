/**
 * GitHub v3 REST API
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * The GitHub App installation. Webhook payloads contain the `installation` property when the event is configured for and sent to a GitHub App. For more information, see \"[Using webhooks with GitHub Apps](https://docs.github.com/enterprise-server@3.9/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps).\"
 */
export interface GitHubSimpleInstallation {
  /**
   * The ID of the installation.
   */
  id: number;
  /**
   * The global node ID of the installation.
   */
  node_id: string;
}
