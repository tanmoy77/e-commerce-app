import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_ADD_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

export const orderReducer = (state={}, action) => {
    switch(action.type){
        case ORDER_ADD_REQUEST:
            return {loading: true}
        case ORDER_ADD_SUCCESS:
            return {loading: false,success:true, order: action.payload}
        case ORDER_ADD_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_ADD_RESET:
            return {}
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={loading:true, orderItems:[], shippingAddress:{}}, action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const payOrderReducer = (state={}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading:true}
        case ORDER_PAY_SUCCESS:
            return {loading:false, success: true}
        case ORDER_PAY_FAIL:
            return {loading:false, error: action.payload}
        case ORDER_PAY_RESET:
            return {}
        default:
            return state;
    }
}