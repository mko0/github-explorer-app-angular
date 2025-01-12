/**
 * GitHub v3 REST API
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec,
  HttpContext,
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

// @ts-ignore
import { GitHubBasicError } from '../model/basicError';
// @ts-ignore
import { GitHubMinimalRepository } from '../model/minimalRepository';
// @ts-ignore
import { GitHubShortBranch } from '../model/shortBranch';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  protected basePath = 'http://HOSTNAME/api/v3';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string | string[],
    @Optional() configuration: Configuration,
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      const firstBasePath = Array.isArray(basePath) ? basePath[0] : undefined;
      if (firstBasePath != undefined) {
        basePath = firstBasePath;
      }

      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  // @ts-ignore
  private addToHttpParams(
    httpParams: HttpParams,
    value: any,
    key?: string,
  ): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(
    httpParams: HttpParams,
    value?: any,
    key?: string,
  ): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(
          (elem) =>
            (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key)),
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(
            key,
            (value as Date).toISOString().substring(0, 10),
          );
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k,
            )),
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * List branches
   *
   * @param owner The account owner of the repository. The name is not case sensitive.
   * @param repo The name of the repository without the &#x60;.git&#x60; extension. The name is not case sensitive.
   * @param _protected Setting to &#x60;true&#x60; returns only protected branches. When set to &#x60;false&#x60;, only unprotected branches are returned. Omitting this parameter returns all branches.
   * @param perPage The number of results per page (max 100). For more information, see \&quot;[Using pagination in the REST API](https://docs.github.com/enterprise-server@3.9/rest/using-the-rest-api/using-pagination-in-the-rest-api).\&quot;
   * @param page The page number of the results to fetch. For more information, see \&quot;[Using pagination in the REST API](https://docs.github.com/enterprise-server@3.9/rest/using-the-rest-api/using-pagination-in-the-rest-api).\&quot;
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public reposListBranches(
    owner: string,
    repo: string,
    _protected?: boolean,
    perPage?: number,
    page?: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<Array<GitHubShortBranch>>;
  public reposListBranches(
    owner: string,
    repo: string,
    _protected?: boolean,
    perPage?: number,
    page?: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpResponse<Array<GitHubShortBranch>>>;
  public reposListBranches(
    owner: string,
    repo: string,
    _protected?: boolean,
    perPage?: number,
    page?: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpEvent<Array<GitHubShortBranch>>>;
  public reposListBranches(
    owner: string,
    repo: string,
    _protected?: boolean,
    perPage?: number,
    page?: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<any> {
    if (owner === null || owner === undefined) {
      throw new Error(
        'Required parameter owner was null or undefined when calling reposListBranches.',
      );
    }
    if (repo === null || repo === undefined) {
      throw new Error(
        'Required parameter repo was null or undefined when calling reposListBranches.',
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (_protected !== undefined && _protected !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>_protected,
        'protected',
      );
    }
    if (perPage !== undefined && perPage !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>perPage,
        'per_page',
      );
    }
    if (page !== undefined && page !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>page,
        'page',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected,
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let localVarTransferCache: boolean | undefined =
      options && options.transferCache;
    if (localVarTransferCache === undefined) {
      localVarTransferCache = true;
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/repos/${this.configuration.encodeParam({ name: 'owner', value: owner, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}/${this.configuration.encodeParam({ name: 'repo', value: repo, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}/branches`;
    return this.httpClient.request<Array<GitHubShortBranch>>(
      'get',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        transferCache: localVarTransferCache,
        reportProgress: reportProgress,
      },
    );
  }

  /**
   * List repositories for a user
   * Lists public repositories for the specified user.
   * @param username The handle for the GitHub user account.
   * @param type Limit results to repositories of the specified type.
   * @param sort The property to sort the results by.
   * @param direction The order to sort by. Default: &#x60;asc&#x60; when using &#x60;full_name&#x60;, otherwise &#x60;desc&#x60;.
   * @param perPage The number of results per page (max 100). For more information, see \&quot;[Using pagination in the REST API](https://docs.github.com/enterprise-server@3.9/rest/using-the-rest-api/using-pagination-in-the-rest-api).\&quot;
   * @param page The page number of the results to fetch. For more information, see \&quot;[Using pagination in the REST API](https://docs.github.com/enterprise-server@3.9/rest/using-the-rest-api/using-pagination-in-the-rest-api).\&quot;
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public reposListForUser(
    username: string,
    type?: 'all' | 'owner' | 'member',
    sort?: 'created' | 'updated' | 'pushed' | 'full_name',
    direction?: 'asc' | 'desc',
    perPage?: number,
    page?: number,
    observe?: 'body',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<Array<GitHubMinimalRepository>>;
  public reposListForUser(
    username: string,
    type?: 'all' | 'owner' | 'member',
    sort?: 'created' | 'updated' | 'pushed' | 'full_name',
    direction?: 'asc' | 'desc',
    perPage?: number,
    page?: number,
    observe?: 'response',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpResponse<Array<GitHubMinimalRepository>>>;
  public reposListForUser(
    username: string,
    type?: 'all' | 'owner' | 'member',
    sort?: 'created' | 'updated' | 'pushed' | 'full_name',
    direction?: 'asc' | 'desc',
    perPage?: number,
    page?: number,
    observe?: 'events',
    reportProgress?: boolean,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<HttpEvent<Array<GitHubMinimalRepository>>>;
  public reposListForUser(
    username: string,
    type?: 'all' | 'owner' | 'member',
    sort?: 'created' | 'updated' | 'pushed' | 'full_name',
    direction?: 'asc' | 'desc',
    perPage?: number,
    page?: number,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: {
      httpHeaderAccept?: 'application/json';
      context?: HttpContext;
      transferCache?: boolean;
    },
  ): Observable<any> {
    if (username === null || username === undefined) {
      throw new Error(
        'Required parameter username was null or undefined when calling reposListForUser.',
      );
    }

    let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
    if (type !== undefined && type !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>type,
        'type',
      );
    }
    if (sort !== undefined && sort !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>sort,
        'sort',
      );
    }
    if (direction !== undefined && direction !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>direction,
        'direction',
      );
    }
    if (perPage !== undefined && perPage !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>perPage,
        'per_page',
      );
    }
    if (page !== undefined && page !== null) {
      localVarQueryParameters = this.addToHttpParams(
        localVarQueryParameters,
        <any>page,
        'page',
      );
    }

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined =
      options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['application/json'];
      localVarHttpHeaderAcceptSelected =
        this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set(
        'Accept',
        localVarHttpHeaderAcceptSelected,
      );
    }

    let localVarHttpContext: HttpContext | undefined =
      options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }

    let localVarTransferCache: boolean | undefined =
      options && options.transferCache;
    if (localVarTransferCache === undefined) {
      localVarTransferCache = true;
    }

    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (
        this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
      ) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/users/${this.configuration.encodeParam({ name: 'username', value: username, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}/repos`;
    return this.httpClient.request<Array<GitHubMinimalRepository>>(
      'get',
      `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        params: localVarQueryParameters,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        transferCache: localVarTransferCache,
        reportProgress: reportProgress,
      },
    );
  }
}