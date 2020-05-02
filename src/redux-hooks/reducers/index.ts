import { combineReducers } from "redux";
import { ProductsState } from "./products";
import products from "./products";
import { CartState } from "./cart";
import cart from "./cart";

export type Product = {
  id: number;
  inventory: number;
  price: number;
  title: string;
};

export interface State {
  products: ProductsState;
  cart: CartState;
}

export default combineReducers<State>({
  products,
  cart,
});

export const getCartProducts = (
  state: State
): (Product & { quantity: number })[] => {
  const addedIds = state.cart.addedIds;
  const quantityById = state.cart.quantityById;
  return addedIds.map((productId) => ({
    ...state.products.byId[productId],
    quantity: quantityById[productId],
  }));
};

export const getTotalPrices = (state: State): number => {
  const products = getCartProducts(state);
  return +products
    .reduce((pre, cur) => {
      return pre + cur.price * cur.quantity;
    }, 0)
    .toFixed(2);
};
