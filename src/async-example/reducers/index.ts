import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as ActionsType from "../types/actionTypes";
import {
  Post,
  PostsBySubredditState,
  ReceiveDataPayload,
  RequestPostsPayload,
  SelectedSubredditState,
  SelectSubredditPayload,
  State,
  SubredditState,
} from "../types";

const selectedSubreddit = createSlice({
  initialState: "react" as SelectedSubredditState,
  name: "selectedSubreddit",
  reducers: {
    [ActionsType.SELECT_SUBREDDIT]: (
      state,
      action: PayloadAction<SelectSubredditPayload>
    ): SelectedSubredditState => action.payload,
  },
});

const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {} as SubredditState,
  reducers: {
    [ActionsType.RECEIVE_DATA]: {
      reducer(
        state: SubredditState,
        action: PayloadAction<ReceiveDataPayload>
      ): SubredditState {
        const { payload } = action;
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          lastUpdated: payload.receivedAt,
          itemByIds: payload.posts.reduce((pre, cur) => {
            pre[cur.id] = cur;
            return pre;
          }, {} as SubredditState["itemByIds"]),
          itemIDs: payload.posts.map((post) => post.id),
        };
      },
      prepare(
        json: { data: { children: { data: Post }[] } },
        subreddit: SelectedSubredditState
      ): { payload: ReceiveDataPayload } {
        return {
          payload: {
            subreddit,
            posts: json.data.children.map((child) => child.data),
            receivedAt: Date.now(),
          },
        };
      },
    },
    [ActionsType.REQUEST_POSTS]: (
      state: SubredditState,
      payload: PayloadAction<RequestPostsPayload>
    ) => {
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    },
  },
});

export const {
  [ActionsType.RECEIVE_DATA]: receiveData,
  [ActionsType.REQUEST_POSTS]: requestPosts,
} = subredditSlice.actions;

export const {
  [ActionsType.SELECT_SUBREDDIT]: selectSubreddit,
} = selectedSubreddit.actions;

const postsBySubredditSlice = createSlice({
  initialState: {} as PostsBySubredditState,
  name: "postsBySubreddit",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestPosts, (state, action) => {
      const { payload } = action;
      state[payload] = subredditSlice.reducer(state[payload], action);
    });
    builder.addCase(receiveData, (state, action) => {
      const { payload } = action;
      const { subreddit } = payload;
      state[subreddit] = subredditSlice.reducer(state[subreddit], action);
    });
  },
});

export default combineReducers<State>({
  [selectedSubreddit.name]: selectedSubreddit.reducer,
  [postsBySubredditSlice.name]: postsBySubredditSlice.reducer,
});
