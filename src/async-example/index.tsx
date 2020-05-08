import React from "react";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";
import { watchFetchData } from "./sagas";
import createSageMiddleware from "redux-saga";
import App from "./components/App";

const sagaMiddleware = createSageMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(watchFetchData);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers/index.ts", () => {
    import("./reducers/index").then((module) => {
      store.replaceReducer(module.default);
    });
  });
}

const ReduxAsync: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxAsync;
