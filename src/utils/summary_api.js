export const baseURL = 'http://localhost:8000/'

const SummaryApi = {
    register: {
        url: '/api/auth/register',
        method: 'post',
    },
    login: {
        url: '/api/auth/login',
        method: 'post',
    },
    refreshToken: {
        url: '/api/auth/token',
        method: 'post',
    },
    getMe: {
        url: '/api/users/me',
        method: 'get',
    },
    getWorkspaces: {
        url: '/api/workspaces',
        method: 'get',
    },
    createWorkspace: {
        url: '/api/workspaces',
        method: 'post',
    },
    updateWorkspace: (workspaceId) => ({
        url: `/api/workspaces/${workspaceId}`,
        method: 'put',
    }),
    deleteWorkspace: (workspaceId) => ({
        url: `/api/workspaces/${workspaceId}`,
        method: 'delete',
    }),
    addMembersToWorkspace: (workspaceId) => ({
        url: `/api/workspaces/add-members/${workspaceId}`,
        method: 'post',
    }),
    removeMembersFromWorkspace: (workspaceId) => ({
        url: `/api/workspaces/remove-members/${workspaceId}`,
        method: 'post',
    }),
    getChannels: (workspaceId) => ({
        url: `/api/channels/${workspaceId}`,
        method: 'get',
    }),
    createChannel: {
        url: '/api/channels',
        method: 'post',
    },
    updateChannel: (channelId) => ({
        url: `/api/channels/${channelId}`,
        method: 'put',
    }),
    removeChannel: (channelId) => ({
        url: `/api/channels/${channelId}`,
        method: 'delete',
    }),
    getDMChannels: (workspaceId) => ({
        url: `/api/DMs/${workspaceId}`,
        method: 'get',
    }),
    createDMChannel: {
        url: '/api/DMs',
        method: 'post',
    },
    deleteDMChannel: (dmChannelId) => ({
        url: `/api/DMs/${dmChannelId}`,
        method: 'delete',
    }),
    addMemberToChannel: (channelId) => ({
        url: `/api/channels/${channelId}/members`,
        method: 'post',
    }),
    removeMemberFromChannel: (channelId) => ({
        url: `/api/channels/${channelId}/members`,
        method: 'delete',
    }),
    getMessages: (channelId) => ({
        url: `/api/messages/${channelId}`,
        method: 'get',
    }),
    searchMessages: {
        url: `/api/messages/search`,
        method: 'post',
    },
}

export default SummaryApi
