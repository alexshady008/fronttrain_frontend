export const FETCH_LOADING = 'fetchLoading'
export const FETCH_SUCCESS = 'fetchCompleted'
export const FETCH_ERROR = 'fetchError'
export const FETCH_RESET = 'fetchReset'

export const fetchRequestAction = () => {
    return {
        type: FETCH_LOADING
    }
}

export const fetchSuccessAction = () => {
    return {
        type: FETCH_SUCCESS
    }
}

export const fetchErrorAction = (error) => {
    return {
        type: FETCH_ERROR,
        error: error
    }
}

export const fetchResetAction = () => {
    return {
        type: FETCH_RESET
    }
}


// export const fetchThunk = (action, request, url, value, config) => {
//     return async (dispatch) => {
//         console.log('Thunk Comenzado')
//         dispatch( fetchRequestAction() )
//         try {
//             const response = await request(url, value, config)
//             const {data} = response
//             console.log(data)
//             if (data.error) throw new Error(data.error)
//             dispatch( fetchSuccessAction() )
//             dispatch( action(data) )
//         } catch (error) {
//             dispatch( fetchErrorAction() )
//         }
//     }
// }