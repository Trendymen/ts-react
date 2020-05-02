import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { Provider } from "react-redux";
import React from "react";
import reducer from "./reducers";
import App from "./components/App";
import { getProductsData } from "./actions";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

(store.dispatch as ThunkDispatch<any, any, any>)(getProductsData());

const ReduxHooksDemo: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxHooksDemo;
