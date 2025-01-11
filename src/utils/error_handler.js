export const handleErrors = (error) => {
    if (error.response) {
        // If the error has a response from the backend
        return {
            message: error.response.data.message || 'An error occurred',
            status_code: error.response.status,
        }
    } else if (error.request) {
        // If no response was received from the backend
        return {
            message: 'No response from the server. Please try again.',
            status_code: 444,
        }
    } else {
        // For other errors (e.g., network issues, invalid configuration)
        return {
            message: error.message || 'An unknown error occurred',
            status_code: 500,
        }
    }
}

export const handleErrorsChannels = (error) => {
    if (error.response) {
        // If the error has a response from the backend
        return {
            channels: [],
            message: error.response.data.message || 'An error occurred',
            status_code: error.response.status,
        }
    } else if (error.request) {
        // If no response was received from the backend
        return {
            channels: [],
            message: 'No response from the server. Please try again.',
            status_code: 444,
        }
    } else {
        // For other errors (e.g., network issues, invalid configuration)
        return {
            channels: [],
            message: error.message || 'An unknown error occurred',
            status_code: 500,
        }
    }
}
