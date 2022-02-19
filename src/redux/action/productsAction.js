export const PRODUCTS_FOUND = 'productsFound'
export const PRODUCTS_NOT_FOUND = 'productsNotFound'
export const PRODUCTS_UPDATE = 'productsUpdated'

export const productsFoundAction = (productList) => {
    return {
        type: PRODUCTS_FOUND,
        payload: productList
    }
}

export const productsNotFoundAction = () => {
    return {
        type: PRODUCTS_NOT_FOUND
    }
}

export const productsUpdateddAction = (productList) => {
    return {
        type: PRODUCTS_UPDATE,
        payload: productList
    }
}
