import { Reducer } from "redux";
import { Product } from "./index";

import { combineReducers } from "redux";
import * as actionsType from "../constants";
import { ReceiveProductsAction, AddToCardAction } from "../actions";

export type ByIdState = Record<Product["id"], Product>;
export type VisibleIdsState = Product["id"][];

export interface ProductsState {
  byId: Record<Product["id"], Product>;
  visibleIds: Product["id"][];
}

type Actions = ReceiveProductsAction | AddToCardAction;

const byId: Reducer<ByIdState, Actions> = (state: ByIdState = {}, action) => {
  switch (action.type) {
    case actionsType.RECEIVE_PRODUCTS:
      return action.products.reduce((pre, cur) => {
        pre[cur.id] = cur;
        return pre;
      }, state);
    case actionsType.ADD_TO_CART:
      return {
        ...state,
        [action.productId]: {
          ...state[action.productId],
          inventory: state[action.productId].inventory - 1,
        },
      };
    default:
      return state;
  }
};
const visibleIds: Reducer<VisibleIdsState, ReceiveProductsAction> = (
  state: VisibleIdsState = [],
  action
) => {
  switch (action.type) {
    case actionsType.RECEIVE_PRODUCTS:
      return action.products.map((product: Product) => product.id);
    default:
      return state;
  }
};

export const getVisibleProducts = (state: ProductsState): Product[] =>
  state.visibleIds.map((id) => state.byId[id]);

export default combineReducers({
  byId,
  visibleIds,
});
