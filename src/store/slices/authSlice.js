import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials)
            return response // Return the token and user data
        } catch (error) {
            return rejectWithValue(error.response.data.error)
        }
    }
)

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData)
            return response
        } catch (error) {
            return rejectWithValue(error.response.data.error)
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
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
        },
        resetAuthState: (state) => {
            state.message = null
            state.status_code = null
            state.isLoggedIn = false
        },
        setMessageAndStatusCode: (state, action) => {
            state.message = action.payload.message
            state.status_code = action.payload.status_code
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
                state.token = action.payload.access_token
                state.refresh_token = action.payload.refresh_token
                state.user = null
                state.isLoggedIn = action.payload.status_code === 200
                state.status_code = action.payload.status_code
                state.message = action.payload.message
                if (action.payload.access_token) {
                    localStorage.setItem('token', action.payload.access_token)
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    },
})

export const { logout, resetAuthState, setMessageAndStatusCode } =
    authSlice.actions

export default authSlice.reducer
