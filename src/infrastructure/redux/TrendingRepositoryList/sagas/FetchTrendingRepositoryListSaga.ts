import container from '@/infrastructure/container/InversifyContainer';
import TYPES from '@/infrastructure/container/Types';
import { ActionResponse } from '@/infrastructure/redux/Interfaces';
import {
  FETCH_TRENDING_REPOSITORY_LIST,
  FetchTrendingRepositoryListActionFields,
  FetchTrendingRepositoryListFailureAction,
  FetchTrendingRepositoryListSuccessAction,
} from '@/infrastructure/redux/TrendingRepositoryList/actions/FetchTrendingRepositoryListAction';
import { GithubService } from '@/infrastructure/services/github/GithubService';
import { store } from '@/renderer';
import { call, put, takeEvery } from 'redux-saga/effects';

export function* FetchTrendingRepositoryListSaga() {
  yield takeEvery(FETCH_TRENDING_REPOSITORY_LIST, FetchTrendingRepositoryList);
}

function FetchTrendingRepositoryListApiCall(fields: FetchTrendingRepositoryListActionFields) {
  const githubService = container.get<GithubService>(TYPES.GithubService);
  githubService.accessToken = store.getState().githubAccessToken;
  return githubService.search.forRepositories(fields.language.value, fields.frequency);
}

function* FetchTrendingRepositoryList(action: ActionResponse<FetchTrendingRepositoryListActionFields>) {
  try {
    alert(action.payload.language);
    const response = yield call(FetchTrendingRepositoryListApiCall, action.payload);
    yield put(FetchTrendingRepositoryListSuccessAction(response));
  } catch (error) {
    yield put(FetchTrendingRepositoryListFailureAction(error.message));
  }
}
