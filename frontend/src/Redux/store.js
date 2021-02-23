import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { allProductsReducer } from './AllProducts/allProductsReducer';
import { authReducer } from './Auth/authReducer'
import { addToCartReducer } from './Cart/authReducer';
import { contactReducer } from './Contact/authReducer';
import { menProductsReducer } from './MenProducts/MenProductsReducer';
import { registerReducer } from './Register/authReducer';
import { womenProductsReducer } from './WomenProducts/WomenProductsReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    allProducts: allProductsReducer,
    menProducts: menProductsReducer,
    womenProducts: womenProductsReducer,
    cart: addToCartReducer,
    contact: contactReducer,
    register: registerReducer,
})

export const store = createStore( rootReducer, composeEnhancer(applyMiddleware(thunk)))