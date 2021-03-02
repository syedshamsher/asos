import {
  CONTACT_REQUEST,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
} from "./actionTypes"
import axios from "axios"

export const contactRequest = () => ({
  type: CONTACT_REQUEST
})

export const contactSuccess = (payload) => ({
  type: CONTACT_SUCCESS,
  payload
})

export const contactFailure = () => ({
  type: CONTACT_FAILURE
})

export const contactUser = (userDetails) => (dispatch) => {
  console.log( userDetails )
  dispatch(contactRequest())
  const config = {
      method: "post",
      url: "/asos/contact",
      headers: {
          "Content-Type": "application/json"
      },
      data: userDetails
  }
  axios(config)
      .then((res) =>
          dispatch(
              contactSuccess(console.log("User Successfully contacted"))
          )
      )
      .catch((err) => dispatch(contactFailure(err.message)))
}
