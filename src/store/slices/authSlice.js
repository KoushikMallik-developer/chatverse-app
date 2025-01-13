import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../../utils/axios'
import SummaryApi from '../../utils/summary_api'
import { AxiosToastError } from '../../utils/axios_toast_error_handler'
import toast from 'react-hot-toast'

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'registerUser',
    async (userData, thunkAPI) => {
        const payload = {
            name: userData['name'],
            email: userData['email'],
            password: userData['password'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: payload,
            })
            debugger
            return {
                message: response.data.message,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (userData, thunkAPI) => {
        const payload = {
            email: userData['email'],
            password: userData['password'],
        }
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: payload,
            })
            return {
                message: response.data.message,
                token: response.data?.accessToken,
                refresh: response.data?.refreshToken,
                status_code: response.status, // Include token if login is successful
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

// Async thunk for getting user details
export const getUserDetails = createAsyncThunk(
    'getUserDetails',
    async (userData, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getMe,
            })
            return {
                message: 'User details fetched successfully',
                user: response.data,
                status_code: response.status,
            }
        } catch (error) {
            const errorPayload = AxiosToastError(error)
            return thunkAPI.rejectWithValue({
                message: errorPayload.message,
                status_code: error.status,
            })
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        token: null,
        refresh_token: null,
        isLoading: false,
        message: null,
        status_code: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.refresh_token = null
            state.isLoggedIn = false
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        },
        resetAuthState: (state) => {
            state.message = null
            state.status_code = null
            state.isLoggedIn = false
        },
        resetMessages: (state) => {
            state.message = null
            state.status_code = null
        },
        setMessageAndStatusCode: (state, action) => {
            state.message = action.payload.message
            state.status_code = action.payload.status_code
            toast.error(state.message)
        },
    },
    extraReducers: (builder) => {
        builder
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.message = null
                state.status_code = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.token = action.payload.token
                state.refresh_token = action.payload.refresh
                state.user = null
                state.isLoggedIn = action.payload.status_code === 200
                state.status_code = action.payload.status_code
                state.message = action.payload.message
                if (action.payload.token) {
                    localStorage.setItem('access_token', action.payload.token)
                }
                toast.success(state.message || 'Logged in successfully')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                debugger
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                toast.success(
                    state.message ||
                        'User registration successful. Please login.'
                )
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.user = action.payload.user
                state.status_code = action.payload.status_code
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
    },
})

export const {
    logout,
    resetAuthState,
    setMessageAndStatusCode,
    resetMessages,
} = authSlice.actions

export default authSlice.reducer
