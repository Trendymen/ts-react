import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import ProductItem from "./ProductItem";
import { getVisibleProducts } from "../reducers/products";

const Products: React.FC = () => {
  console.log("products");
  const productsState = useSelector(getVisibleProducts, shallowEqual);
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
