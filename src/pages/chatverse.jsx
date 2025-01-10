import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Bell,
    User,
    Settings,
    Mic,
    Phone,
    Reply,
    Smile,
    Share2,
    X,
    Search,
    Plus,
    MessageCircle,
} from 'lucide-react'
import {
    sendMessage,
    addReaction,
    addReply,
    setActiveChat,
    addNotification,
} from '../store/slices/chatSlice'
import HuddleControls from '../components/huddle/HuddleControls'
import DrawingCanvas from '../components/huddle/DrawingCanvas'
import EmojiPicker from '../components/common/emoji_picker'

const ChatverseApp = () => {
    const dispatch = useDispatch()
    const {
        messages,
        channels,
        users,
        activeChat,
        notifications,
        huddleState,
    } = useSelector((state) => state.chat)

    const [messageInput, setMessageInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [replyingTo, setReplyingTo] = useState(null)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    // Handle new messages
    useEffect(() => {
        const handleNewMessage = (message) => {
            dispatch(sendMessage(message))
            dispatch(
                addNotification({
                    id: Date.now(),
                    title: `New message from ${message.user}`,
                    content: message.content,
                })
            )
        }

        // Mock WebSocket connection
        const mockWebSocket = {
            onmessage: (event) => handleNewMessage(event.data),
        }

        return () => {
            // Cleanup WebSocket
        }
    }, [dispatch])

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* Huddle Drawing Area */}
            {huddleState.isActive && huddleState.isDrawing && (
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Drawing Canvas</h3>
                        <X
                            className="cursor-pointer"
                            onClick={() => dispatch({ type: 'TOGGLE_DRAWING' })}
                        />
                    </div>
                    <DrawingCanvas />
                </div>
            )}
        </div>
    )
}
export default ChatverseApp
