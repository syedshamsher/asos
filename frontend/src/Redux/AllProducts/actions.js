import { FETCH_ALL_PRODUCTS_REQUEST, 
         FETCH_ALL_PRODUCTS_SUCCESS, 
         FETCH_ALL_PRODUCTS_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const allProductsRequest = () => ({
    type: FETCH_ALL_PRODUCTS_REQUEST

})

export const allProductsSuccess = (payload) => ({
    type: FETCH_ALL_PRODUCTS_SUCCESS,
    payload
})

export const allProductsFailure = (payload) => ({
    type: FETCH_ALL_PRODUCTS_FAILURE,
})

export const getAllProducts = () => (dispatch) => {
    dispatch(allProductsRequest())
    axios.get('https://shamsher-asos.herokuapp.com/asos/')
        .then((res) => {
            dispatch(allProductsSuccess(res.data))
        })
        .catch((err) => {
            dispatch(allProductsFailure(err))
        })
}