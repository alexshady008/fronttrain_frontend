const USER_REGISTER = 'userRegister'
const USER_DETAILS = 'userDetails'
const USER_LOGIN = 'userLogin'
const USER_LOGOUT = 'userLogout'
const USER_ERROR = 'userError'


const initial_state= {
    login: false,
    error: false,
	id: null,
	username: '',
	email: '',
	role: '',
	avatar: null,
    confirmation: null,
    token: null,
	client: {
		name: '',
		lastName: '',
		storeName: '',
		storeDescription: '',
		phoneNumber: null,
		location: ''
	}
}

const userReducer = (state=initial_state, action) => {

    switch(action.type){
        case USER_REGISTER: {
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role
            }
        }

        case USER_DETAILS: {
            return {
                ...action.payload,
                login: state.login,
                error: false,
                }
        }

        case USER_LOGIN: {
            return {
                ...state,
                login: true,
                error: false,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                confirmation: action.payload.confirmation,
                token: action.payload.token
            }
        }

        case USER_LOGOUT: {
            return initial_state
        }

        case USER_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }

        default: {
            return state
        }
    }
}


export default userReducer