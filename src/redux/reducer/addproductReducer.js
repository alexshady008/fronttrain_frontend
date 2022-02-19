import {UPSERT_PRODUCT, UPDATE_FORM, ADD_PRODUCT_ERROR, ADD_PRODUCT_RESET} from '../action/addProductAction'

export const initial_value = {
    type: 'idle',
    details: {
        id: null,
        description: '',
        price: '',
        categoryId: '',
        productBrand: '',
        carBrand: '',
        carType: '',
        image: null
    }
}


const addproductReducer = (state=initial_value, action) => {
    switch(action.type){
        case UPDATE_FORM: {
            return {
                type: 'idle',
                details: {
                    ...action.payload
                }
            }
        }

        case UPSERT_PRODUCT: {
            return {
                type: 'upserted',
                details: {
                    ...initial_value.details
                }
            }
        }

        case ADD_PRODUCT_ERROR: {
            return {
                type: 'err',
                details: { 
                    ...state.details
                }
            }
        }

        case ADD_PRODUCT_RESET: {
            return {
                type: initial_value.type,
                details: initial_value.details
            }
        }

        default: {
            return state
        }
    }
}


export default addproductReducer;
