import React from "react";
import PostList from "./PostList";
import Picker from "./Picker";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types";
import { selectSubreddit } from "../reducers";
import AppCss from "./App.module.css";
import { Action } from "redux";

const App: React.FC = () => {
  const selectedSubReddit = useSelector(
    (state: State) => state.selectedSubreddit
  );
  const dispatch = useDispatch();
  return (
    <div className={AppCss.asyncExampleApp}>
      <h1>{selectedSubReddit}</h1>
      <Picker
        subreddits={["react", "vue", "typescript"]}
        currentSubreddit={selectedSubReddit}
        onChangeHandler={(value): Action => dispatch(selectSubreddit(value))}
      />
      <PostList currentSubreddit={selectedSubReddit} />
    </div>
  );
};

export default App;
