import { loadData, saveData } from "../../Utils/LocalStorage"
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

const initState = {
  isLoading: false,
  error: null,
  token: loadData("token") || null,
  activeUser: [],
  cart: [],
  orders: []
}

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
      case LOGIN_REQUEST:
          return {
              ...state,
              isLoading: true,
              error: null
          }
            
      case LOGIN_SUCCESS:
          const data = payload;
          saveData('token' , data)
           return {
               ...state,
               isLoading: false,
               token: data,
               error: null
          }

      case LOGIN_FAILURE:
        const exhausted = null;
        saveData('token' , exhausted)
          return {
              ...state,
              isLoading: false,
              error: payload,
              token: exhausted
          }
      
      case ACTIVE_USER_REQUEST:
          return {
              ...state,
              isLoading: true,
              error: null
          }
            
      case ACTIVE_USER_SUCCESS:
          const user = payload;
           return {
               ...state,
               isLoading: false,
               activeUser: user,
               error: null
          }

      case ACTIVE_USER_FAILURE:
        const exhaustedActiveToken = null;
        saveData('token' , exhaustedActiveToken)
          return {
              ...state,
              isLoading: false,
              error: payload,
              token: exhaustedActiveToken,
              activeUser: null
          }
      
      case GET_CART_REQUEST:
          return {
              ...state,
              isLoading: true,
              error: null
          }
            
      case GET_CART_SUCCESS:
          const cartData = payload;
           return {
               ...state,
               isLoading: false,
               cart: !cartData ? [] : cartData,
               error: null
          }

      case GET_CART_FAILURE:
        const exhaustedToken = null;
        saveData('token' , exhaustedToken)
          return {
              ...state,
              isLoading: false,
              error: payload,
              token: exhaustedToken,
              cart: null
          }
      
      case GET_ORDER_REQUEST:
          return {
              ...state,
              isLoading: true,
              error: null
          }
            
      case GET_ORDER_SUCCESS:
          const orderData = payload;
           return {
               ...state,
               isLoading: false,
               orders: !orderData ? [] : orderData,
               error: null
          }

      case GET_ORDER_FAILURE:
        const falseToken = null;
        saveData('token' , falseToken)
          return {
              ...state,
              isLoading: false,
              error: payload,
              token: falseToken,
              orders: []
          }

      case LOGOUT:
          const inActiveState = null;
          saveData('token' , inActiveState)
          return {
              isLoading: false,
              token: inActiveState,
              error: null,
              cart: [],
              activeUser: [],
              orders: [],
          }

      default:
          return state
  }
}
