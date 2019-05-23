import { combineReducers } from "redux";

import { cartList } from "../assests/cartItems";
const cartReducer = () => {
  return cartList;
};

export default combineReducers({
  cartList: cartReducer,
});
