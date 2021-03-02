import { FETCH_MEN_PRODUCTS_REQUEST, 
         FETCH_MEN_PRODUCTS_SUCCESS, 
         FETCH_MEN_PRODUCTS_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const menProductsRequest = () => ({
    type: FETCH_MEN_PRODUCTS_REQUEST

})

export const menProductsSuccess = (payload) => ({
    type: FETCH_MEN_PRODUCTS_SUCCESS,
    payload
})

export const menProductsFailure = (payload) => ({
    type: FETCH_MEN_PRODUCTS_FAILURE,
})

export const getMenProducts = () => (dispatch) => {
    dispatch(menProductsRequest())
    axios.get('https://shamsher-asos.herokuapp.com/asos/men')
        .then((res) => {
            dispatch(menProductsSuccess(res.data))
        })
        .catch((err) => {
            dispatch(menProductsFailure(err))
        })
}