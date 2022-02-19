export const FILTER_FORM = 'filterByForm'
export const FILTER_PAGINATION = 'filterByPagination'
export const FILTER_RESET = 'filterReset'
export const FILTER_BY_CATEGORY = 'filterByCategory'


export const filterFormAction = (value) => {
    return {
        type: FILTER_FORM,
        payload: value
    }
}

export const filterPaginationAction = (value) => {
    return {
        type: FILTER_PAGINATION,
        payload: value
    }
}

export const filterByCategoryAction = (value) => {
    return {
        type: FILTER_BY_CATEGORY,
        payload: value
    }
}

export const filterResetAction = () => {
    return {
        type: FILTER_RESET
    }
}