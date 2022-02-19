export const ADD_PRODUCT = 'addProduct'
export const DELETE_PRODUCT = 'deleteProduct'
export const ORDER_PRODUCTS = 'orderProducts'
export const UPDATE_QUANTITY_PRODUCT = 'updateQuantityProduct'

export const addProductAction = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload
    }
}

export const updateQuantityProductAction = (payload) => {
    return {
        type: UPDATE_QUANTITY_PRODUCT,
        payload
    }
}

export const deleteProductAction = (payload) => {
    return {
        type: DELETE_PRODUCT,
        payload
    }
}

export const orderProductsAction = () => {
    return {
        type: ORDER_PRODUCTS
    }
}