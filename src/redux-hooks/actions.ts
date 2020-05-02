import * as actionsType from "./constants";
import api from "./api/shop";
import { ActionCreator, Action } from "redux";
import { Product, State } from "./reducers";
import { ThunkAction } from "redux-thunk";

export interface ReceiveProductsAction
  extends Action<typeof actionsType.RECEIVE_PRODUCTS> {
  products: Product[];
}

export interface AddToCardAction
  extends Action<typeof actionsType.ADD_TO_CART> {
  productId: Product["id"];
}

const receiveProducts: ActionCreator<ReceiveProductsAction> = (
  products: Product[]
) => ({
  type: actionsType.RECEIVE_PRODUCTS,
  products,
});

const addToCartUnsafe: ActionCreator<AddToCardAction> = (productId) => ({
  type: actionsType.ADD_TO_CART,
  productId,
});

export const getProductsData: ActionCreator<ThunkAction<
  void,
  void,
  void,
  ReceiveProductsAction
>> = () => {
  return (dispatch): void => {
    api.getProducts((_products) => {
      dispatch(receiveProducts(_products));
    });
  };
};

export const addToCart: ActionCreator<ThunkAction<
  void,
  State,
  void,
  AddToCardAction
>> = (productId: number) => (dispatch, getState): void => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};
