/**
 * Mocking client-server processing
 */
import _products from "./products.json";
import { Product } from "../reducers";

const TIMEOUT = 100;

type Callback = (_products?: Product[]) => void;

export default {
  getProducts: (
    cb: Callback,
    timeout: number = TIMEOUT
  ): ReturnType<typeof setTimeout> => setTimeout(() => cb(_products), timeout),
  buyProducts: (
    payload: any,
    cb: Callback,
    timeout: number = TIMEOUT
  ): ReturnType<typeof setTimeout> => setTimeout(() => cb(), timeout),
};
