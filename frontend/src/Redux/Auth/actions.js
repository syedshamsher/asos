import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  ACTIVE_USER_REQUEST,
  ACTIVE_USER_SUCCESS,
  ACTIVE_USER_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
} from "./actionTypes"
import axios from "axios"
import { loadData, saveData } from "../../Utils/LocalStorage"

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
})

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload
})
export const activeUserRequest = () => ({
  type: ACTIVE_USER_REQUEST
})

export const activeUserSuccess = (payload) => ({
  type: ACTIVE_USER_SUCCESS,
  payload
})

export const activeUserFailure = (payload) => ({
  type: ACTIVE_USER_FAILURE,
  payload
})
export const cartRequest = () => ({
  type: GET_CART_REQUEST
})

export const cartSuccess = (payload) => ({
  type: GET_CART_SUCCESS,
  payload
})

export const cartFailure = (payload) => ({
  type: GET_CART_FAILURE,
  payload
})
export const orderRequest = () => ({
  type: GET_ORDER_REQUEST
})

export const orderSuccess = (payload) => ({
  type: GET_ORDER_SUCCESS,
  payload
})

export const orderFailure = (payload) => ({
  type: GET_ORDER_FAILURE,
  payload
})

export const logout = () => ({
  type: LOGOUT
})

export const loginUser = (loginDetails) => (dispatch) => {
  dispatch(loginRequest())
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/asos/user/profile`,
    headers: {
      "Content-Type": "application/json"
    },
    data: loginDetails
  }
  axios(config)
      .then((res) => {
          return (
            dispatch(loginSuccess(res.data))
          )
      } )
      .catch((error) => {
          return (
            dispatch(loginFailure(error.response))
          )
      })
}

export const getActiveUser = () => (dispatch) => {
  let data = loadData('token')
  // console.log(data.token)
  if( data != null ) {
    dispatch(activeUserRequest())
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/asos/users`,
      headers: {
        "Authorization": `Bearer ${data.token}`
      },
    }
    axios(config)
        .then((res) => {
            return (
              dispatch(activeUserSuccess(res.data))
            )
        } )
        .catch((error) => {
          saveData('token', null)
          return (
              dispatch(activeUserFailure(error.response))
          )
        })
  }
}

export const getCartData = () => (dispatch) => {
  let data = loadData('token')
  if( data !== null ) {
    dispatch(cartRequest())
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/asos/cart`,
      headers: {
        "Authorization": `Bearer ${data.token}`
      },
    }
    axios(config)
        .then((res) =>
            dispatch(
                cartSuccess(res.data)
            )
        )
        .catch((err) => {
          saveData('token', null)
          return(
            dispatch(cartFailure(err.message))
          )
        } )
  }
}

export const getOrderData = () => (dispatch) => {
  let data = loadData('token')
  if( data !== null ) {
    dispatch(orderRequest())
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/asos/order-details`,
      headers: {
        "Authorization": `Bearer ${data.token}`
      },
    }
    axios(config)
        .then((res) =>
            dispatch(
                orderSuccess(res.data)
            )
        )
        .catch((err) => {
          saveData('token', null)
          return(
            dispatch(orderFailure(err.message))
          )
        } )
  }
}