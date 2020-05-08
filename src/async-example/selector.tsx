import { State, SelectedSubredditState, SubredditState } from "./types";

export const getSubredditById = (
  state: State,
  subreddit: SelectedSubredditState
): SubredditState => state.postsBySubreddit[subreddit];
