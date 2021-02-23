import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes"
import axios from "axios"

export const registerRequest = () => ({
  type: REGISTER_REQUEST
})

export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload
})

export const registerFailure = (payload) => ({
  type: REGISTER_FAILURE,
  payload
})

export const registerUser = (userDetails) => (dispatch) => {
  console.log( userDetails )
  dispatch(registerRequest())
  const config = {
      method: "post",
      url: "http://localhost:5000/asos/account/register",
      headers: {
          "Content-Type": "application/json"
      },
      data: userDetails
  }
  axios(config)
      .then((res) => {
          console.log(res.data)
          dispatch(registerSuccess(res.data))
        }
      )
      .catch((err) => {
        console.log(err.response)
        dispatch(registerFailure(err.response))
      })
}
