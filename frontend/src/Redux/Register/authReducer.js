import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes"

const initState = {
  isLoading: false,
  isRegister: null,
  error: null,
}

export const registerReducer = (state = initState, { type, payload }) => {
  switch (type) {
      case REGISTER_REQUEST:
          return {
              ...state,
              isLoading: true,
              error: null,
              isRegister: null,
          }

      case REGISTER_SUCCESS:
          return {
              ...state,
              isLoading: false,
              isRegister: payload,
              error: null
          }

      case REGISTER_FAILURE:
          return {
              ...state,
              isLoading: false,
              error: payload
          }
      default:
          return state
  }
}
