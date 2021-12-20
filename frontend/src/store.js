import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  reviewReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers'
import {orderDetailsReducer, orderReducer, payOrderReducer} from './reducers/orderReducers';


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: reviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: payOrderReducer,

});
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")?
  JSON.parse(localStorage.getItem("userInfo")):[]

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')?
  JSON.parse(localStorage.getItem('paymentMethod')): {}

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')): {}
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: {userInfo: userInfoFromStorage},
  userRegister: {userInfo: userInfoFromStorage},

};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
