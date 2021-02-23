import {
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    allProducts: []
  }
  
  export const allProductsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FETCH_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
  
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                allProducts: payload
            }
  
        case FETCH_ALL_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
  }
  