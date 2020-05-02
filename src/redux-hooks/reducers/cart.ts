import { Product } from "./index";
import { Reducer } from "redux";
import { AddToCardAction } from "../actions";
import { ADD_TO_CART } from "../constants";

export type AddedIdsState = Product["id"][];
export type QuantityByIdState = Record<Product["id"], Product["inventory"]>;

export interface CartState {
  addedIds: AddedIdsState;
  quantityById: QuantityByIdState;
}

const initialState: CartState = {
  addedIds: [],
  quantityById: {},
};

const addedIds: Reducer<AddedIdsState, AddToCardAction> = (
  state = initialState.addedIds,
  action
) => {
  if (action.type === ADD_TO_CART) {
    return state.includes(action.productId)
      ? state
      : state.concat(action.productId);
  }
  return state;
};

const quantityById: Reducer<QuantityByIdState, AddToCardAction> = (
  state = initialState.quantityById,
  action
): QuantityByIdState => {
  if (action.type === ADD_TO_CART) {
    const cur = state[action.productId];
    return { ...state, [action.productId]: cur ? cur + 1 : 1 };
  }
  return state;
};

const cart: Reducer<CartState, AddToCardAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};

export default cart;
