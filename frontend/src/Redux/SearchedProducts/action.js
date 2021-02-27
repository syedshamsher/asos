import { SEARCHED_PRODUCTS } from "./actionTypes"

export const search = ( payload ) => {
    return {
        type: SEARCHED_PRODUCTS,
        payload: payload
    }
}