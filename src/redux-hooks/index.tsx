import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import React from "react";
import reducer, { State } from "./reducers";
import "./index.css";

const store = createStore(reducer);

const App: React.FC = () => {
  const count = useSelector((state: State) => state);
  return <div className="count">{count}</div>;
};

const ReduxHooksDemo: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxHooksDemo;
