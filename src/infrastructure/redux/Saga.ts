import { fork } from 'redux-saga/effects';

import { addUserToStargazerListSaga } from '@/infrastructure/redux/sagas/AddUserToStargazerList.saga';
import { FetchTrendingRepositoryListSaga } from '@/infrastructure/redux/sagas/FetchTrendingRepositoryList.saga';
import { setCurrentStargazerSaga } from '@/infrastructure/redux/sagas/SetCurrentStargazer.saga';
import { setGithubAccessTokenSaga } from '@/infrastructure/redux/sagas/SetGithubAccessToken.saga';

export default function* root() {
  yield fork(addUserToStargazerListSaga);
  yield fork(FetchTrendingRepositoryListSaga);
  yield fork(setCurrentStargazerSaga);
  yield fork(setGithubAccessTokenSaga);
}