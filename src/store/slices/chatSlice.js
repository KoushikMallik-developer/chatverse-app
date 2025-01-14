import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [
        {
            id: 1,
            user: 'John Doe',
            content: "Hey team! How's the new feature coming along?",
            timestamp: '9:00 AM',
            reactions: ['👍', '🎉'],
            replies: [
                {
                    id: 2,
                    user: 'Jane Smith',
                    content: 'Making good progress!',
                    timestamp: '9:05 AM',
                },
            ],
        },
    ],
    channels: [
        { id: 1, name: 'general', unread: 2 },
        { id: 2, name: 'random', unread: 0 },
    ],
    users: [
        {
            id: 1,
            name: 'John Doe',
            status: 'online',
            avatar: 'JD',
            email: 'john@example.com',
            role: 'Developer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            status: 'offline',
            avatar: 'JS',
            email: 'jane@example.com',
            role: 'Designer',
        },
    ],
    activeChat: { type: 'channel', id: 1 },
    notifications: [],
    huddleState: {
        isActive: false,
        participants: [],
        isScreenSharing: false,
        isDrawing: false,
    },
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        addReaction: (state, action) => {
            const { messageId, reaction, userId } = action.payload
            const message = state.messages.find((m) => m.id === messageId)
            if (message) {
                if (!message.reactions) message.reactions = []
                message.reactions.push(reaction)
            }
        },
        addReply: (state, action) => {
            const { messageId, reply } = action.payload
            const message = state.messages.find((m) => m.id === messageId)
            if (message) {
                if (!message.replies) message.replies = []
                message.replies.push(reply)
            }
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload
        },
        toggleHuddle: (state, action) => {
            state.huddleState.isActive = !state.huddleState.isActive
        },
        toggleScreenShare: (state, action) => {
            state.huddleState.isScreenSharing =
                !state.huddleState.isScreenSharing
        },
        toggleDrawing: (state, action) => {
            state.huddleState.isDrawing = !state.huddleState.isDrawing
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
    },
})

export const {
    sendMessage,
    addReaction,
    addReply,
    setActiveChat,
    toggleHuddle,
    toggleScreenShare,
    toggleDrawing,
    addNotification,
} = chatSlice.actions
export default chatSlice.reducer
