import {FETCH_LOADING, FETCH_SUCCESS, FETCH_ERROR, FETCH_RESET} from '../action/fetchAction'

const initial_state = {
    fetchState: 'idle',
    fetchError: false
}

const fetchReducer = (state=initial_state, action) => {

    switch(action.type){
        case FETCH_LOADING: {
            return {
                fetchState: 'loading',
                fetchError: false
            }
        }

        case FETCH_SUCCESS: {
            return {
                fetchState: 'success',
                fetchError: false
            }
        }

        case FETCH_ERROR: {
            return {
                fetchState: 'error',
                fetchError: action.error
            }
        }

        case FETCH_RESET: {
            return {
                fetchState: 'idle',
                fetchError: false
            }
        }

        default: {
            return state
        }
    }

}


export default fetchReducer

