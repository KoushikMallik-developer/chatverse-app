import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

const handleErrors = (error) => {
    if (error.response) {
        // If the error has a response from the backend
        return {
            message: error.response.data.message || 'An error occurred',
            status_code: error.response.status,
        }
    } else if (error.request) {
        // If no response was received from the backend
        return {
            message: 'No response from the server. Please try again.',
            status_code: 444,
        }
    } else {
        // For other errors (e.g., network issues, invalid configuration)
        return {
            message: error.message || 'An unknown error occurred',
            status_code: 500,
        }
    }
}

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

const authService = {
    register,
    login,
}

export default authService
