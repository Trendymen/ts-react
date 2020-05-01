import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Cart from "./cart";
import ReduxHooksDemo from "./redux-hooks";

const App: React.FC = () => {
  return (
    <>
      <Cart />
      <ReduxHooksDemo />
    </>
  );
};

export default App;
