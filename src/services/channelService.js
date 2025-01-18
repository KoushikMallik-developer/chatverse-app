import axios from 'axios'
import { handleErrorsChannels } from '../utils/error_handler'

const API_URL = 'http://127.0.0.1:8000'

// OLD CODE

const getChannels = async (token, workspaceId) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/channels/${workspaceId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrorsChannels(error)
    }
}

const createChannel = async (channelData, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/channels`,
            channelData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrorsChannels(error)
    }
}

const removeChannel = async (channelId, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/channels/${channelId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrorsChannels(error)
    }
}

const updateChannel = async (channelData, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/channels/${channelData.id}`,
            channelData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        return handleErrorsChannels(error)
    }
}

const channelService = {
    getChannels,
    createChannel,
    removeChannel,
    updateChannel,
}

export default channelService
