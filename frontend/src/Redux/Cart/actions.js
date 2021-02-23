import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from "./actionTypes"
import axios from "axios"

export const addToCartRequest = () => ({
  type: ADD_TO_CART_REQUEST
})

export const addToCartSuccess = () => ({
  type: ADD_TO_CART_SUCCESS,
})

export const addToCartFailure = () => ({
  type: ADD_TO_CART_FAILURE
})
export const removeFromCartRequest = () => ({
  type: REMOVE_FROM_CART_REQUEST
})

export const removeFromCartSuccess = () => ({
  type: REMOVE_FROM_CART_SUCCESS,
})

export const removeFromCartFailure = () => ({
  type: REMOVE_FROM_CART_FAILURE
})

export const addToCart = (addToCartDetails) => (dispatch) => {
  console.log( addToCartDetails )
  dispatch(addToCartRequest())
  const config = {
    method: "post",
    url: "http://localhost:5000/asos/cart/add",
    headers: {
      "Content-Type": "application/json"
    },
    data: addToCartDetails
  }

  axios(config)
      .then((res) =>
          dispatch(
              addToCartSuccess(res.data)
          )
      )
      .catch((err) => dispatch(addToCartFailure(err.message)))
}

export const removeFromCart = (removeFromCartDetails) => (dispatch) => {
  dispatch(removeFromCartRequest())
  const config = {
    method: "post",
    url: "http://localhost:5000/asos/cart/delete",
    headers: {
      "Content-Type": "application/json"
    },
    data: removeFromCartDetails
  }
  axios(config)
      .then((res) =>
          dispatch(
              removeFromCartSuccess(res.data)
          )
      )
      .catch((err) => dispatch(removeFromCartFailure(err.message)))
}
