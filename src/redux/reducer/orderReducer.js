import {ADD_PRODUCT, DELETE_PRODUCT, ORDER_PRODUCTS, UPDATE_QUANTITY_PRODUCT} from '../action/orderAction'


const initial_state = {
    productsList: [],
    orderProducts: false
}

const updateQuantityProduct = (products, productId, quantity) => {
    // console.log('productId: ',productId)
    // console.log('quantity: ',quantity)
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.id === productId){
            product.quantity = quantity
            break
        }
        
    }
    return products
}

const deleteProduct = (products, productId) => {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.id === productId){
            products.splice(i, 1)
            break
        }
        
    }
    return products
}

const orderReducer = (state=initial_state, action) => {
    switch(action.type) {

        case ADD_PRODUCT: {
            return {
                productsList: [ ...state.productsList, action.payload ],
                orderProducts: false
            }
        }

        case UPDATE_QUANTITY_PRODUCT: {
            return {
                productsList: updateQuantityProduct(state.productsList, action.payload.id, action.payload.quantity),
                orderProducts: false
            }
        }

        case DELETE_PRODUCT: {
            return {
                ...state,
                productsList: deleteProduct(state.productsList, action.payload.id)
            }
        }

        case ORDER_PRODUCTS: {
            return {
                productsList: [],
                orderProducts: true
            }
        }

        default: {
            return state
        }
    }
}


export default orderReducer