import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from "./actionTypes"

const initState = {
  isLoading: false,
  isContact: false,
}

export const contactReducer = (state = initState, { type, payload }) => {
  switch (type) {
      case CONTACT_REQUEST:
          return {
              ...state,
              isLoading: true
          }

      case CONTACT_SUCCESS:
          return {
              ...state,
              isLoading: false,
              iscontact: true,
          }

      case CONTACT_FAILURE:
          return {
              ...state,
              isLoading: false,
              iscontact: false
          }
      default:
          return state
  }
}
