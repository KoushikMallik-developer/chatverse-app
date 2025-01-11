import axios from 'axios'
import { handleErrors } from '../utils/error_handler'

const API_URL = 'http://127.0.0.1:8000'

const getWorkspaces = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/workspaces`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const createWorkspace = async (workspaceData, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/workspaces`,
            workspaceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const removeWorkspace = async (workspaceId, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/workspaces/${workspaceId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const updateWorkspace = async (workspaceData, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/workspaces/${workspaceData.id}`,
            workspaceData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}
const addMemberToWorkspace = async (userData, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/workspaces/add-members/${userData.workspaceId}`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}
const removeMemberFromWorkspace = async (userData, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/workspaces/remove-members/${userData.workspaceId}`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const workspaceService = {
    getWorkspaces,
    createWorkspace,
    removeWorkspace,
    updateWorkspace,
    addMemberToWorkspace,
    removeMemberFromWorkspace,
}

export default workspaceService
