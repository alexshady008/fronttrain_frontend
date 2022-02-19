import {FILTER_FORM, FILTER_PAGINATION, FILTER_RESET, FILTER_BY_CATEGORY} from '../action/filterAction'
import config from '../../config/config'

const initial_state= {
    offset:0,
    limit:config.limitPage,
    categoryId: 0,
    productBrand: '',
    carBrand: '',
    carType: ''
}

const filterReducer = (state=initial_state, action) => {
    switch(action.type){
        case FILTER_FORM: {
            return {
                ...state,
                offset: 0,
                categoryId: action.payload.categoryId,
                productBrand: action.payload.productBrand,
                carBrand: action.payload.carBrand,
                carType: action.payload.carType
            }
        }

        case FILTER_PAGINATION: {
            return {
                ...state,
                offset: action.payload
            }
        }

        case FILTER_BY_CATEGORY: {
            return {
                ...state,
                categoryId: action.payload,
                offset: 0
            }
        }

        case FILTER_RESET: {
            return initial_state
        }

        default: {
            return state
        }
    }
}


export default filterReducer