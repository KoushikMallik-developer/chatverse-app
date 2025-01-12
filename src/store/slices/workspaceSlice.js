import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workspaceService from '../../services/workspaceService'
import Axios from '../../utils/axios'
import SummaryApi from '../../utils/summary_api'
import { AxiosToastError } from '../../utils/axios_toast_error_handler'
import toast from 'react-hot-toast'

// Async thunk for getting workspaces
export const fetchWorkspaces = createAsyncThunk(
    'workspace/fetchWorkspaces',
    async (userData, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.getWorkspaces,
            })
            return {
                message: 'Workspaces fetched successfully',
                workspaces: response.data,
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
// Async thunk for removing a workspace
export const removeWorkspace = createAsyncThunk(
    'workspace/removeWorkspace',
    async ({ workspaceId }, thunkAPI) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteWorkspace(workspaceId),
            })
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

// Async thunk for updating a workspace
export const updateWorkspace = createAsyncThunk(
    'workspace/updateWorkspace',
    async ({ workspaceData }, thunkAPI) => {
        try {
            const payload = {
                name: workspaceData['name'],
                description: workspaceData['description'],
            }
            const response = await Axios({
                ...SummaryApi.updateWorkspace(workspaceData['id']),
                data: payload,
            })
            return {
                workspace: response.data.workspace,
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

// Async thunk for creating a new workspace
export const createWorkspace = createAsyncThunk(
    'workspace/createWorkspace',
    async ({ workspaceData }, thunkAPI) => {
        try {
            const payload = {
                name: workspaceData['name'],
                description: workspaceData['description'],
            }
            const response = await Axios({
                ...SummaryApi.createWorkspace,
                data: payload,
            })
            return {
                workspace: response.data.workspace,
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
// Async thunk for adding a member to workspace
export const addMemberToWorkspace = createAsyncThunk(
    'workspace/addMemberToWorkspace',
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            const response = await workspaceService.addMemberToWorkspace(
                userData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for removing a member from workspace
export const removeMemberFromWorkspace = createAsyncThunk(
    'workspace/removeMemberFromWorkspace',
    async ({ userData, token }, { rejectWithValue }) => {
        try {
            const response = await workspaceService.removeMemberFromWorkspace(
                userData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState: {
        workspaces: [],
        isLoading: false,
        message: null,
        status_code: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkspaces.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(fetchWorkspaces.fulfilled, (state, action) => {
                state.isLoading = false
                state.workspaces = action.payload.workspaces
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(createWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.workspaces.push(action.payload.workspace)
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                toast.success(state.message)
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(removeWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(removeWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                state.workspaces = state.workspaces.filter(
                    (workspace) => workspace._id !== action.meta.arg.workspaceId
                )
                toast.success(state.message)
            })
            .addCase(removeWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(updateWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updateWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
                const index = state.workspaces.findIndex(
                    (workspace) =>
                        workspace._id === action.payload.workspace._id
                )
                if (index !== -1) {
                    state.workspaces[index] = action.payload.workspace
                }
                toast.success(state.message)
            })
            .addCase(updateWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload.message
                state.status_code = action.payload.status_code
            })
            .addCase(addMemberToWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(addMemberToWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.workspaces.findIndex(
                    (workspace) =>
                        workspace._id === action.payload?.workspace?._id
                )
                if (index !== -1) {
                    state.workspaces[index] = action.payload?.workspace
                }
            })
            .addCase(addMemberToWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(removeMemberFromWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(removeMemberFromWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.workspaces.findIndex(
                    (workspace) =>
                        workspace._id === action.payload.workspace._id
                )
                if (index !== -1) {
                    state.workspaces[index] = action.payload.workspace
                }
            })
            .addCase(removeMemberFromWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
    },
})
export default workspaceSlice.reducer
