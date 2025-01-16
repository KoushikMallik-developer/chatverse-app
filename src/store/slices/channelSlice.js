import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../../utils/axios'
import SummaryApi from '../../utils/summary_api'
import { AxiosToastError } from '../../utils/axios_toast_error_handler'
import toast from 'react-hot-toast'

// Async thunk for getting channels
export const fetchChannels = createAsyncThunk(
    'channel/fetchChannels',
    async ({ workspaceId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getChannels(workspaceId),
            })
            return {
                message: 'Channels fetched successfully',
                channels: response.data,
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

// Async thunk for creating a new channel
export const createChannel = createAsyncThunk(
    'channel/createChannel',
    async (channelData, thunkAPI) => {
        try {
            const payload = {
                name: channelData['name'],
                description: channelData['description'],
                type: channelData['type'] || 'public',
                workspaceId: channelData['workspaceId'],
            }
            const response = await Axios({
                ...SummaryApi.createChannel,
                data: payload,
            })
            return {
                message:
                    response.data.message || 'Channel created successfully',
                channel: response.data.channel,
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

// Async thunk for removing a channel
export const removeChannel = createAsyncThunk(
    'channel/removeChannel',
    async ({ channelId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.removeChannel(channelId),
            })
            return {
                message:
                    response.data.message || 'Channel removed successfully',
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

// Async thunk for updating a channel
export const updateChannel = createAsyncThunk(
    'channel/updateChannel',
    async (channelData, thunkAPI) => {
        try {
            const payload = {
                name: channelData['name'],
                description: channelData['description'],
            }
            const response = await Axios({
                ...SummaryApi.updateChannel(channelData['channelId']),
                data: payload,
            })
            return {
                message:
                    response.data.message || 'Channel updated successfully',
                channel: response.data.channel,
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

export const addMemberToChannel = createAsyncThunk(
    'channel/addMemberToChannel',
    async (channelData, thunkAPI) => {
        try {
            const payload = {
                userId: channelData['userId'],
            }
            const response = await Axios({
                ...SummaryApi.addMemberToChannel(channelData['channelId']),
                data: payload,
            })
            return {
                message:
                    response.data.message ||
                    'Member added to channel successfully',
                channel: response.data.channel,
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
export const removeMemberFromChannel = createAsyncThunk(
    'channel/removeMemberFromChannel',
    async (channelData, thunkAPI) => {
        try {
            const payload = {
                userId: channelData['userId'],
            }
            const response = await Axios({
                ...SummaryApi.removeMemberFromChannel(channelData['channelId']),
                data: payload,
            })
            return {
                message:
                    response.data.message ||
                    'Member removed from channel successfully',
                channel: response.data.channel,
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

const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        currentChannel: {},
        channels: [],
        isLoading: false,
        message: null,
    },
    reducers: {
        setActiveChannel: (state, action) => {
            state.currentChannel = action.payload
        },
        cleanActiveChannel: (state) => {
            state.currentChannel = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.isLoading = false
                state.channels = action.payload.channels
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                state.currentChannel = null
                toast.success(state.message)
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(createChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                if (action.payload.channel) {
                    state.channels.push(action.payload.channel)
                }
                state.currentChannel = action.payload.channel
                toast.success(state.message)
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(removeChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(removeChannel.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                state.channels = state.channels.filter(
                    (channel) => channel._id !== action.meta.arg.channelId
                )
                state.currentChannel = null
                toast.success(state.message)
            })
            .addCase(removeChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(updateChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                const index = state.channels.findIndex(
                    (channel) => channel._id === action.payload.channel._id
                )
                if (index !== -1) {
                    state.channels[index] = action.payload.channel
                }
                state.currentChannel = action.payload.channel
                toast.success(state.message)
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(addMemberToChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(addMemberToChannel.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                const index = state.channels.findIndex(
                    (channel) => channel._id === action.payload.channel._id
                )
                if (index !== -1) {
                    state.channels[index] = action.payload.channel
                }
                state.currentChannel = action.payload.channel
                toast.success(state.message)
            })
            .addCase(addMemberToChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
    },
})

export const { setActiveChannel, cleanActiveChannel } = channelSlice.actions
export default channelSlice.reducer
