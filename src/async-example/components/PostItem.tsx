import React from "react";
import { Post as PostType, PostsBySubredditState, State } from "../types";
import { useSelector } from "react-redux";

type PostProps = Pick<PostType, "id"> & {
  subreddit: keyof PostsBySubredditState;
};

const PostItem: React.FC<PostProps> = ({ id, subreddit }) => {
  const post = useSelector(
    (state: State) => state.postsBySubreddit[subreddit].itemByIds[id]
  );
  return <div>{post.title}</div>;
};

export default PostItem;
