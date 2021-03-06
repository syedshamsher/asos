import { FETCH_WOMEN_PRODUCTS_REQUEST, 
         FETCH_WOMEN_PRODUCTS_SUCCESS, 
         FETCH_WOMEN_PRODUCTS_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const womenProductsRequest = () => ({
    type: FETCH_WOMEN_PRODUCTS_REQUEST

})

export const womenProductsSuccess = (payload) => ({
    type: FETCH_WOMEN_PRODUCTS_SUCCESS,
    payload
})

export const womenProductsFailure = (payload) => ({
    type: FETCH_WOMEN_PRODUCTS_FAILURE,
})

export const getWomenProducts = () => (dispatch) => {
    dispatch(womenProductsRequest())
    axios.get(`${process.env.REACT_APP_BASE_URL}/asos/women`)
        .then((res) => {
            dispatch(womenProductsSuccess(res.data))
        })
        .catch((err) => {
            dispatch(womenProductsFailure(err))
        })
}