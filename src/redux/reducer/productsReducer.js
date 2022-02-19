import {PRODUCTS_FOUND, PRODUCTS_NOT_FOUND, PRODUCTS_UPDATE} from '../action/productsAction'

const initial_state= {
    productsList: [],
    error: false
}

const productsReducer = (state=initial_state, action) => {
    switch(action.type){
        case PRODUCTS_FOUND: {
            return {
                productsList: action.payload,
                error: false
            }
        }
        case PRODUCTS_UPDATE: {
            return {
                productsList: action.payload,
                error: false
            }
        }
        case PRODUCTS_NOT_FOUND: {
            return {
                productsList: [],
                error: 'notFound'
            }
        }
        default: {
            return state
        }
    }
}


export default productsReducer