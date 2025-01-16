import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import Axios from '../../utils/axios'
import SummaryApi from '../../utils/summary_api'
import { AxiosToastError } from '../../utils/axios_toast_error_handler'
import toast from 'react-hot-toast'

const socket = io('http://localhost:8000')

// Async thunk for joining a room
export const joinChannel = createAsyncThunk(
    'chat/joinRoom',
    async ({ user, channelId }, { dispatch }) => {
        socket.emit('joinChannel', { user: user, channelId: channelId })
    }
)
export const leaveChannel = createAsyncThunk(
    'chat/joinRoom',
    async ({ user, channelId }, { dispatch }) => {
        socket.emit('leaveChannel', {
            channelId: channelId,
            user: user,
        })
    }
)

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ channelId, senderId, content }) => {
        socket.emit('sendMessage', { channelId, senderId, content })
    }
)

export const fetchMessages = createAsyncThunk(
    'channel/fetchMessages',
    async ({ channelId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getMessages(channelId),
            })
            return {
                message:
                    response.data.message || 'Messages fetched successfully',
                messages: response.data.messages,
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

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentChannelMessages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.currentChannelMessages.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.currentChannelMessages = action.payload.messages
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
    },
})

export const { addMessage } = chatSlice.actions

export default chatSlice.reducer

// Initialize socket listeners
export const initializeSocketListeners = (dispatch) => {
    socket.on('newMessage', (data) => {
        dispatch(addMessage(data))
    })
    socket.on('userJoined', (data) => {
        console.log(`User ${data.user_name} joined the channel`)
    })
    socket.on('userLeft', (data) => {
        console.log(`User ${data.user_name} left the channel`)
    })
}
export const clearSocketListeners = () => {
    socket.off('newMessage')
    socket.off('userJoined')
    socket.off('userLeft')
}
