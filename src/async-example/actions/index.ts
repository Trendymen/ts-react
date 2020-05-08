import { SelectedSubredditState, State } from "../types";
import { requestPosts } from "../reducers";
import { ThunkAction } from "@reduxjs/toolkit";

const shouldFetchPosts = (state: State, subreddit: SelectedSubredditState) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export const fetchPostsIfNeeded = (
  subreddit: SelectedSubredditState
): ThunkAction<
  ReturnType<typeof requestPosts> | undefined,
  State,
  void,
  ReturnType<typeof requestPosts>
> => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(requestPosts(subreddit));
  }
};
