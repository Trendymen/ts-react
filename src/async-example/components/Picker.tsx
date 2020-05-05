import React from "react";

interface PickerProps {
  subreddits: string[];
  currentSubreddit: string;
  onChangeHandler: (value: string) => any;
}

const Picker: React.FC<PickerProps> = ({
  subreddits,
  currentSubreddit,
  onChangeHandler,
}) => {
  return (
    <select
      value={currentSubreddit}
      onChange={(e) => onChangeHandler(e.target.value)}
    >
      {subreddits.map((subreddit) => {
        return (
          <option value={subreddit} key={subreddit}>
            {subreddit}
          </option>
        );
      })}
    </select>
  );
};

export default Picker;
