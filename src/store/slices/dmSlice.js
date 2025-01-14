import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../../utils/axios'
import SummaryApi from '../../utils/summary_api'
import { AxiosToastError } from '../../utils/axios_toast_error_handler'
import toast from 'react-hot-toast'

// Async thunk for getting DMs
export const getDMs = createAsyncThunk(
    'dm/getDMs',
    async ({ workspaceId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getDMChannels(workspaceId),
            })
            return {
                message: 'DM Channels fetched successfully',
                dms: response.data,
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

// Async thunk for creating a DM
export const createDM = createAsyncThunk(
    'dm/createDM',
    async ({ dmData }, thunkAPI) => {
        try {
            const payload = {
                workspaceId: dmData['workspaceId'],
                recipientId: dmData['recipientId'],
            }
            const response = await Axios({
                ...SummaryApi.createDMChannel,
                data: payload,
            })
            return {
                message:
                    response.data.message || 'DM Channel created successfully',
                dm: response.data.dm,
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
// Async thunk for deleting a DM
export const deleteDM = createAsyncThunk(
    'dm/deleteDM',
    async ({ dmChannelId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteDMChannel(dmChannelId),
            })
            return {
                message:
                    response.data.message || 'DM Channel removed successfully',
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
                state.message = null
            })
            .addCase(getDMs.fulfilled, (state, action) => {
                state.isLoading = false
                state.dms = action.payload.dms
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(getDMs.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(createDM.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createDM.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                if (action.payload.dm) {
                    state.dms.push(action.payload.dm)
                }
                toast.success(state.message)
            })
            .addCase(createDM.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(deleteDM.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(deleteDM.fulfilled, (state, action) => {
                state.isLoading = false
                state.dms = state.dms.filter(
                    (dm) => dm._id !== action.meta.arg.dmChannelId
                )
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(deleteDM.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
    },
})

export const { resetDMState } = dmSlice.actions
export default dmSlice.reducer
