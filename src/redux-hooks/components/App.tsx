import React from "react";
import Products from "./Products";
import Cart from "./Cart";
import "./App.css";

const App: React.FC = () => {
  return (
    <main className="shop-cart-main">
      <Products />
      <Cart />
    </main>
  );
};

export default App;
