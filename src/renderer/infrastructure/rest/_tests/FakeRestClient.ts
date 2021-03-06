import axios, { AxiosPromise } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as listStarredData from '@/renderer/infrastructure/rest/_tests/responses/list-starred-success.json';
import * as searchRepositoryData from '@/renderer/infrastructure/rest/_tests/responses/search-repository-success.json';
import * as userDetailData from '@/renderer/infrastructure/rest/_tests/responses/user-detail-success.json';
import { AxiosRestClient } from '@/renderer/infrastructure/rest/AxiosRestClient';

export class FakeRestClient extends AxiosRestClient {
  private readonly mock = new MockAdapter(axios);

  static create() {
    return new FakeRestClient();
  }

  constructor() {
    super();
    this.mock.onGet('/search/repositories').reply(200, searchRepositoryData);
    this.mock.onGet('/users/jasonraimondi/starred').reply(200, listStarredData);
    this.mock.onGet('/users/jasonraimondi').reply(200, userDetailData);
    this.mock.onGet('/user').reply(200, userDetailData);
  }

  get(path: string, queryParameters: any, headers: any = {}, timeout: number = 5000): AxiosPromise {
    return axios.get(
      path,
      {
        headers,
        params: queryParameters,
        timeout,
      },
    );
  }

  post(path: string, formParameters: any, headers: any = {}, timeout: number = 5000): AxiosPromise {
    return axios.post(
      path,
      formParameters,
      {
        headers,
        timeout,
      },
    );
  }
}
