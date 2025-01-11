import axios from 'axios'
import { handleErrors } from '../utils/error_handler'

const API_URL = 'http://127.0.0.1:8000'

const register = async (userData) => {
    userData = {
        name: userData['name'],
        email: userData['email'],
        password: userData['password'],
    }
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/register`,
            userData
        )
        return {
            message: response.data.message,
            status_code: response.status,
        }
    } catch (error) {
        return handleErrors(error)
    }
}
const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, userData)

        return {
            access_token: response.data?.accessToken,
            refresh_token: response.data?.refreshToken,
            message: response.data.message,
            status_code: response.status,
        }
    } catch (error) {
        return handleErrors(error)
    }
}

const getUserDetails = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const authService = {
    register,
    login,
    getUserDetails,
}

export default authService
