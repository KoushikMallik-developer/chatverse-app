import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workspaceService from '../../services/workspaceService'

// Async thunk for getting workspaces
export const fetchWorkspaces = createAsyncThunk(
    'workspace/fetchWorkspaces',
    async (token, { rejectWithValue }) => {
        try {
            const response = await workspaceService.getWorkspaces(token)
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
// Async thunk for removing a workspace
export const removeWorkspace = createAsyncThunk(
    'workspace/removeWorkspace',
    async ({ workspaceId, token }, { rejectWithValue }) => {
        try {
            const response = await workspaceService.removeWorkspace(
                workspaceId,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for updating a workspace
export const updateWorkspace = createAsyncThunk(
    'workspace/updateWorkspace',
    async ({ workspaceData, token }, { rejectWithValue }) => {
        try {
            const response = await workspaceService.updateWorkspace(
                workspaceData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// Async thunk for creating a new workspace
export const createWorkspace = createAsyncThunk(
    'workspace/createWorkspace',
    async ({ workspaceData, token }, { rejectWithValue }) => {
        try {
            const response = await workspaceService.createWorkspace(
                workspaceData,
                token
            )
            return response
        } catch (error) {
            return rejectWithValue(error.message)
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
                state.workspaces = action.payload
            })
            .addCase(fetchWorkspaces.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(createWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(createWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.workspaces.push(action.payload.workspace)
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(removeWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(removeWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                state.workspaces = state.workspaces.filter(
                    (workspace) => workspace._id !== action.meta.arg.workspaceId
                )
            })
            .addCase(removeWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updateWorkspace.pending, (state) => {
                state.isLoading = true
                state.message = null
            })
            .addCase(updateWorkspace.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.workspaces.findIndex(
                    (workspace) =>
                        workspace._id === action.payload.workspace._id
                )
                if (index !== -1) {
                    state.workspaces[index] = action.payload.workspace
                }
            })
            .addCase(updateWorkspace.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
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
