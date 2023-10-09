import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUsersReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./orderReducer";
import DeliveryReducer from "./DeliveyInfo";
import storyReducer from "./storyBook";


const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUsersReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
  orders: ordersReducer,
  info: DeliveryReducer,
  story: storyReducer,
});

export default myReducers;
