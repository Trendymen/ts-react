import React from "react";
import { Product as ProductType } from "../reducers";

type ProductProps = Omit<ProductType, "id" | "inventory"> & {
  quantity: number;
};

const Product: React.FC<ProductProps> = ({ title, price, quantity }) => (
  <div>
    <div>name:{title}</div>
    <div>price:{price}</div>
    <div>quantity:{quantity}</div>
  </div>
);

export default Product;
