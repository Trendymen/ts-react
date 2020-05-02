import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { State } from "../reducers";
import { getVisibleProducts } from "../reducers/products";

const Products: React.FC = () => {
  const productsState = useSelector((state: State) =>
    getVisibleProducts(state.products)
  );
  return (
    <section className={"products-section"}>
      <h2>Products</h2>
      {productsState.map((product) => {
        return <ProductItem {...product} key={product.id} />;
      })}
    </section>
  );
};

export default Products;
