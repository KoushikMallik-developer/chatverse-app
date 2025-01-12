import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dmService from '../../services/dmService'

// Async thunk for getting DMs
export const getDMs = createAsyncThunk(
    'dm/getDMs',
    async ({ workspaceId, token }, { rejectWithValue }) => {
        try {
            const response = await dmService.getDMChannels({
                token: token,
                workspaceId: workspaceId,
            })
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for creating a DM
export const createDM = createAsyncThunk(
    'dm/createDM',
    async ({ dmData, token }, { rejectWithValue }) => {
        try {
            debugger
            const response = await dmService.createDMChannel({ dmData, token })
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// Async thunk for deleting a DM
export const deleteDM = createAsyncThunk(
    'dm/deleteDM',
    async ({ dmChannelId, token }, { rejectWithValue }) => {
        try {
            const response = await dmService.deleteDMChannel(dmChannelId, token)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const dmSlice = createSlice({
    name: 'dm',
    initialState: {
        dms: [],
        isLoading: false,
        message: null,
    },
    reducers: {
        resetDMState: (state) => {
            state.isLoading = false
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDMs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDMs.fulfilled, (state, action) => {
                state.isLoading = false
                state.dms = action.payload
            })
            .addCase(getDMs.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(createDM.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDM.fulfilled, (state, action) => {
                state.isLoading = false
                debugger
                if (action.payload.dm) {
                    state.dms.push(action.payload.dm)
                }
            })
            .addCase(createDM.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(deleteDM.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDM.fulfilled, (state, action) => {
                state.isLoading = false
                state.dms = state.dms.filter(
                    (dm) => dm._id !== action.meta.arg.dmChannelId
                )
            })
            .addCase(deleteDM.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    },
})

export const { resetDMState } = dmSlice.actions
export default dmSlice.reducer
