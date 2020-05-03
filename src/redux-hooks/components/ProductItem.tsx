import Product from "./Product";
import React from "react";
import { Product as ProductType } from "../reducers";
import "./ProductItem.css";
import { addToCart } from "../actions";
import { useDispatch } from "react-redux";

type ProductIProps = ProductType;

const ProductItem: React.FC<ProductIProps> = React.memo(({ ...props }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-item">
      <Product {...props} quantity={props.inventory} />
      <button
        className={"add-button"}
        disabled={!(props.inventory > 0)}
        onClick={(): void => {
          dispatch(addToCart(props.id));
        }}
      >
        add to cart
      </button>
    </div>
  );
});

export default ProductItem;
