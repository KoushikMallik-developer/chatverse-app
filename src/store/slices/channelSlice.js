import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import channelService from '../../services/channelService'

// Async thunk for getting channels
export const fetchChannels = createAsyncThunk(
    'channel/fetchChannels',
    async ({ token, workspaceId }, { rejectWithValue }) => {
        try {
            const response = await channelService.getChannels(
                token,
                workspaceId
            )
            console.log(response, token, workspaceId)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for creating a new channel
export const createChannel = createAsyncThunk(
    'channel/createChannel',
    async ({ channelData, token }, { rejectWithValue }) => {
        try {
            const response = await channelService.createChannel(
                channelData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for removing a channel
export const removeChannel = createAsyncThunk(
    'channel/removeChannel',
    async ({ channelId, token }, { rejectWithValue }) => {
        try {
            const response = await channelService.removeChannel(
                channelId,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for updating a channel
export const updateChannel = createAsyncThunk(
    'channel/updateChannel',
    async ({ channelData, token }, { rejectWithValue }) => {
        try {
            const response = await channelService.updateChannel(
                channelData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        currentChannel: {},
        currentWorkspace: {},
        channels: [],
        isLoading: false,
        message: null,
    },
    reducers: {
        setActiveWorkspace: (state, action) => {
            state.currentWorkspace = action.payload
        },
        setActiveChannel: (state, action) => {
            state.currentChannel = action.payload
        },
        cleanActiveChannel: (state) => {
            state.currentChannel = null
        },
        cleanActiveWorkspace: (state) => {
            state.currentWorkspace = null
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
                state.channels = action.payload
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(createChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload.channel) {
                    state.channels.push(action.payload.channel)
                }
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
                state.channels = state.channels.filter(
                    (channel) => channel._id !== action.meta.arg.channelId
                )
            })
            .addCase(removeChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updateChannel.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.channels.findIndex(
                    (channel) => channel._id === action.payload.channel._id
                )
                if (index !== -1) {
                    state.channels[index] = action.payload
                }
            })
            .addCase(updateChannel.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    },
})

export const {
    setActiveChannel,
    setActiveWorkspace,
    cleanActiveChannel,
    cleanActiveWorkspace,
} = channelSlice.actions
export default channelSlice.reducer
