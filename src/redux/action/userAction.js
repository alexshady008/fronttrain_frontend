export const USER_REGISTER = 'userRegister'
export const USER_DETAILS = 'userDetails'
export const USER_LOGIN = 'userLogin'
export const USER_LOGOUT = 'userLogout'
export const USER_ERROR = 'userError'

export const userRegisterAction = (payload) => {
    return {
        type: USER_REGISTER,
        payload
    }
}

export const userLoginAction = (payload) => {
    return {
        type: USER_LOGIN,
        payload
    }
}

export const userDetailsAction = (payload) => {
    return {
        type: USER_DETAILS,
        payload
    }
}

export const userLogoutAction = () => {
    return {
        type: USER_LOGOUT
    }
}

export const userErrorAction = (error) => {
    return {
        type: USER_ERROR,
        error
    }
}
