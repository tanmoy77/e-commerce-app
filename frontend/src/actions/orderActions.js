import {
  ORDER_ADD_REQUEST,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstants";
import axios from "axios";
import { EMPTY_CART } from "../constants/cartConstants";

//create the order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ADD_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/orders/add/",
      order,
      config
    );

    dispatch({
      type: ORDER_ADD_SUCCESS,
      payload: data,
    });
    //Empty the cart after order has created
    dispatch({                 
      type: EMPTY_CART,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.reponse.data.detail
          : error.message,
    });
  }
};

// get Order Details by Id
export const getOrderDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/orders/${id}/`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
  try{
    dispatch({
      type: ORDER_PAY_REQUEST
    })
    const {userLogin:{userInfo}} = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`http://127.0.0.1:8000/api/orders/${id}/pay/`,
                      paymentResult,
                      config
                      )
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  }catch(error){
    dispatch({
      type: ORDER_PAY_FAIL,
      error: error.response && error.response.data.detail ?
             error.response.data.detail : error.message
    })
  }
}