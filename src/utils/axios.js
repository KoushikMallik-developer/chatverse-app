import axios from 'axios'
import { baseURL } from './summary_api'

const Axios = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

//sending access token in the header
Axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('access_token' || null)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default Axios
