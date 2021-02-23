import { loadData, saveData } from "../../Utils/LocalStorage"
import {
    FETCH_WOMEN_PRODUCTS_REQUEST,
    FETCH_WOMEN_PRODUCTS_SUCCESS,
    FETCH_WOMEN_PRODUCTS_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    womenProducts: loadData('womenProducts') || []
  }
  
  export const womenProductsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FETCH_WOMEN_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
            
            case FETCH_WOMEN_PRODUCTS_SUCCESS:
            const data = payload
            saveData('womenProducts', data)
            return {
                ...state,
                isLoading: false,
                error: null,
                womenProducts: data
            }
  
        case FETCH_WOMEN_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
  }
  