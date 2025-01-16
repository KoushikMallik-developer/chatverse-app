import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
    clearSocketListeners,
    initializeSocketListeners,
    sendMessage,
} from '../../store/slices/chatSlice'

const MessageInput = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { currentChannel } = useSelector((state) => state.channel)

    const [messageInput, setMessageInput] = useState('')
    const [replyingTo, setReplyingTo] = useState(null)

    useEffect(() => {
        console.log('initilaizing socket listeners')
        initializeSocketListeners(dispatch)
        return () => {
            console.log('clearing socket listeners')
            clearSocketListeners()
        }
    }, [])

    const handleSendMessage = () => {
        if (!messageInput.trim()) return
        dispatch(
            sendMessage({
                channelId: currentChannel._id,
                senderId: user._id,
                content: messageInput,
            })
        )
        setMessageInput('')
    }
    return (
        <div className="p-4 border-t">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:border-[#1164A3]"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-[#1164A3] text-white px-4 py-2 rounded-md hover:bg-[#0f5a9e]"
                >
                    Send
                </button>
            </div>
        </div>
    )
}
export default MessageInput
