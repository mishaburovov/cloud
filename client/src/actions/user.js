import axios from 'axios'
import {setUser, logout} from "../reducers/userReducer";



export const registration =  (email, password) => {
    return async dispatch => {
        try {
            console.log(email, password);

            const response = await axios.post(`/api/auth/registration`, {
                email,
                password
            })

            console.log(response.data)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/api/auth/login`, {
                email,
                password
            })
            console.log(response.data)
            console.log(response.data.user, response.data.token)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            
            const response = await axios.get(`/api/auth/auth`,
                {
                    headers: {
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            console.log(response)
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // alert(e.response.data.message)
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}


export const logoutPage =  () => {
    return async dispatch => {
        dispatch(setUser({}))
        dispatch(logout())
    }
}