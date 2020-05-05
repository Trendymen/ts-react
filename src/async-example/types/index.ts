export type Post = {
  id: string;
  title: string;
};

export interface State {
  selectedSubreddit: SelectedSubredditState;
  postsBySubreddit: PostsBySubredditState;
}

export type SubredditState = {
  isFetching: boolean;
  didInvalidate: boolean;
  itemIDs: Post["id"][];
  lastUpdated: number;
  itemByIds: Record<Post["id"], Post>;
};

export type PostsBySubredditState = Record<
  SelectedSubredditState,
  SubredditState
>;
export type SelectedSubredditState = string;

//payload type
export interface ReceiveDataPayload {
  subreddit: SelectedSubredditState;
  posts: Post[];
  receivedAt: number;
}

export type SelectSubredditPayload = SelectedSubredditState;
export type RequestPostsPayload = SelectedSubredditState;
