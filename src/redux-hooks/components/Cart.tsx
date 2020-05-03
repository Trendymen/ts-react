import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getCartProducts, getTotalPrices } from "../reducers";
import Product from "./Product";

const Cart: React.FC = () => {
  const cartProducts = useSelector(getCartProducts, shallowEqual);
  const totalPrices = useSelector(getTotalPrices);
  return (
    <section className={"cart-wrapper"}>
      <h2>Your Cart</h2>
      {cartProducts.map((product) => (
        <div style={{ marginBottom: 10 }} key={product.id}>
          <Product {...product} />
        </div>
      ))}
      <div>Total:{totalPrices}</div>
    </section>
  );
};

export default Cart;
