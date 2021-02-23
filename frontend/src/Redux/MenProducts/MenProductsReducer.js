import { loadData, saveData } from "../../Utils/LocalStorage";
import {
    FETCH_MEN_PRODUCTS_REQUEST,
    FETCH_MEN_PRODUCTS_SUCCESS,
    FETCH_MEN_PRODUCTS_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    menProducts: loadData('menProducts') || []
  }
  
  export const menProductsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FETCH_MEN_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
  
        case FETCH_MEN_PRODUCTS_SUCCESS:
            const data = payload;
            saveData('menProducts', data)
            return {
                ...state,
                isLoading: false,
                error: null,
                menProducts: data
            }
  
        case FETCH_MEN_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
  }
  