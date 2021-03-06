import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types";
import PostItem from "./PostItem";
import { fetchPostsIfNeeded } from "../actions";

interface PickerProps {
  currentSubreddit: string;
}

const PostList: React.FC<PickerProps> = ({ currentSubreddit }) => {
  const postIdList = useSelector(
    (state: State) => state.postsBySubreddit[currentSubreddit]?.itemIDs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostsIfNeeded(currentSubreddit));
  }, [currentSubreddit, dispatch]);
  return (
    <ul>
      {(postIdList || []).map((id) => {
        return <PostItem id={id} subreddit={currentSubreddit} key={id} />;
      })}
    </ul>
  );
};

export default PostList;
