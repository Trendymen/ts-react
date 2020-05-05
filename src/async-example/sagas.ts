import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga/effects";
import { Action } from "redux";
import { SagaIterator } from "redux-saga";
import { receiveData, requestPosts } from "./reducers";
import { RequestPostsPayload } from "./types";

export function* fetchData({
  payload: subreddit,
}: Action & { payload: RequestPostsPayload }): SagaIterator {
  const response: Response = yield call(
    fetch,
    `https://www.reddit.com/r/${subreddit}.json`
  );
  const data = yield call(() => response.json());
  yield put(receiveData(data, subreddit));
}

export function* watchFetchData(): SagaIterator {
  yield takeEvery(requestPosts.toString(), fetchData);
}
