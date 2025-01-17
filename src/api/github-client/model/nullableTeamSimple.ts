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
 * Groups of organization members that gives permissions on specified repositories.
 */
export interface GitHubNullableTeamSimple {
  /**
   * Unique identifier of the team
   */
  id: number;
  node_id: string;
  /**
   * URL for the team
   */
  url: string;
  members_url: string;
  /**
   * Name of the team
   */
  name: string;
  /**
   * Description of the team
   */
  description: string | null;
  /**
   * Permission that the team will have for its repositories
   */
  permission: string;
  /**
   * The level of privacy this team should have
   */
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  /**
   * Distinguished Name (DN) that team maps to within LDAP environment
   */
  ldap_dn?: string;
}
