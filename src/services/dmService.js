import axios from 'axios'
import { handleErrors } from '../utils/error_handler'

const API_URL = 'http://127.0.0.1:8000'

// OLD CODE

const createDMChannel = async ({ dmData, token }) => {
    try {
        const response = await axios.post(`${API_URL}/api/DMs`, dmData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const getDMChannels = async ({ workspaceId, token }) => {
    try {
        const response = await axios.get(`${API_URL}/api/DMs/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        return handleErrors(error)
    }
}

const deleteDMChannel = async ({ dmChannelId, token }) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/DMs/${dmChannelId}`,
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

const dmService = {
    createDMChannel,
    getDMChannels,
    deleteDMChannel,
}

export default dmService
