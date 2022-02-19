export const UPSERT_PRODUCT = 'createProduct'
export const UPDATE_PRODUCT = 'updateProduct'
export const UPDATE_FORM = 'updateForm'
export const ADD_PRODUCT_ERROR = 'addProductError'
export const ADD_PRODUCT_RESET = 'addProductReset'

export const upsertProductAction = (value) => {
    return {
        type: UPSERT_PRODUCT,
        payload: value
    }
}

export const updateFormAction = (value) => {
    return {
        type: UPDATE_FORM,
        payload: value
    }
}

export const addProductErroAction = (value) => {
    return {
        type: ADD_PRODUCT_ERROR,
        err: value
    }
}

export const addProductResetAction = () => {
    return {
        type: ADD_PRODUCT_RESET
    }
}