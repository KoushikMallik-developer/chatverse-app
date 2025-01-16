import React, { useState } from 'react'
import { Reply, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../store/slices/chatSlice'

const MessageInput = () => {
    const dispatch = useDispatch()
    const { messages } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.auth)

    const [messageInput, setMessageInput] = useState('')
    const [replyingTo, setReplyingTo] = useState(null)

    const handleSendMessage = () => {
        if (!messageInput.trim()) return

        const newMessage = {
            user: user._id,
            content: messageInput,
            timestamp: new Date().toLocaleTimeString(),
        }

        dispatch(sendMessage(newMessage))
        setMessageInput('')
    }
    return (
        <div className="p-4 border-t">
            {/*{replyingTo && (*/}
            {/*    <div className="mb-2 text-sm text-gray-500 flex items-center gap-2">*/}
            {/*        <Reply className="w-4 h-4" />*/}
            {/*        Replying to{' '}*/}
            {/*        {messages.find((m) => m.id === replyingTo)?.user}*/}
            {/*        <button*/}
            {/*            className="text-gray-700 hover:text-gray-900"*/}
            {/*            onClick={() => setReplyingTo(null)}*/}
            {/*        >*/}
            {/*            <X className="w-4 h-4" />*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    // placeholder={`Message ${
                    //     currentChannel.type === 'channel'
                    //         ? '#' +
                    //           channels.find((c) => c.id === currentChannel.id)
                    //               ?.name
                    //         : users.find((u) => u.id === currentChannel.id)
                    //               ?.name
                    // }`}
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
