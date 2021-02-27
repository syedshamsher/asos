import { SEARCHED_PRODUCTS,  } from "./actionTypes"

const initState = {
    
    searchedProducts :  []
}

export const searchedProductsReducer =  ( state = initState, { type, payload } ) => {
    switch ( type ) {
        case SEARCHED_PRODUCTS:
            const updatedVal = [...state.searchedProducts, payload]
            return {
                ...state,
                searchedProducts: updatedVal
            }
        
        default :
        return state;
    }
}