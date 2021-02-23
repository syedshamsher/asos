import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILURE,
} from "./actionTypes"

const initState = {
  isLoading: false,
  added: false,
  removed: false,
}

export const addToCartReducer = (state = initState, { type, payload }) => {
  switch (type) {
        case ADD_TO_CART_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case ADD_TO_CART_SUCCESS:
                return {
              ...state,
              isLoading: false,
              added: true,
          }

        case ADD_TO_CART_FAILURE:
          return {
              ...state,
              isLoading: false,
              added: false
          }
        case REMOVE_FROM_CART_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case REMOVE_FROM_CART_SUCCESS:
                return {
              ...state,
              isLoading: false,
              removed: true,
          }

        case REMOVE_FROM_CART_FAILURE:
          return {
              ...state,
              isLoading: false,
              removed: false
          }
        default:
          return state
  }
}
