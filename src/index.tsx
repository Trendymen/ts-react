import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Typography } from "antd";
import "./index.css";
// import Cart from "./cart";
// import CartRedux from "./redux-hooks/index";
// import RedditList from "./async-example/index";
import * as serviceWorker from "./serviceWorker";
import EllipsisParagraph from "./components/EllipsisParagraph";

const root = document.getElementById("root");

ReactDOM.render(
  // <React.StrictMode>
  <>
    {/*<Cart />*/}
    {/*<CartRedux />*/}
    {/*<RedditList />*/}
    <EllipsisParagraph rows={2}>
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
      dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
      dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
      dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
      dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
      dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd
      洒洒水 dsdfadfdfafadfadfad dasdasdasda sassdasd 洒洒水 dsdfadfdfafadfadfad
    </EllipsisParagraph>
  </>,
  // </React.StrictMode>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
