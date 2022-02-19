import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";
import filterReducer from "./filterReducer";
import fetchReducer from "./fetchReducer"
import addproductReducer from './addproductReducer'
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
    user: userReducer,
    addProduct: addproductReducer,
    products: productsReducer,
    order: orderReducer,
    filter: filterReducer,
    fetch: fetchReducer
})

export default rootReducer
