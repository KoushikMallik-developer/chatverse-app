import React, { useState } from 'react'
import HuddleControls from '../huddle/HuddleControls'
import { addReaction, sendMessage } from '../../store/slices/chatSlice'
import { Edit, Reply, Smile, X } from 'lucide-react'
import EmojiPicker from '../common/emoji_picker'
import { useDispatch, useSelector } from 'react-redux'
import ChannelDetailsModal from '../dashboard/channel_detail_modal'
import NameToAvatar from '../../utils/name_to_avatar'
import ChatHeader from '../chat_header'

const ChatArea = () => {
    const dispatch = useDispatch()
    const { messages } = useSelector((state) => state.chat)
    const { currentChannel } = useSelector((state) => state.channel)

    const [messageInput, setMessageInput] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [replyingTo, setReplyingTo] = useState(null)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const handleSendMessage = () => {
        if (!messageInput.trim()) return

        const newMessage = {
            id: Date.now(),
            user: 'Current User',
            content: messageInput,
            timestamp: new Date().toLocaleTimeString(),
            reactions: [],
            replies: [],
            replyTo: replyingTo,
        }

        dispatch(sendMessage(newMessage))
        setMessageInput('')
        setReplyingTo(null)
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <ChatHeader />
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages
                    .filter((msg) => {
                        if (currentChannel.type === 'channel')
                            return !msg.isDirect
                        return (
                            msg.isDirect &&
                            (msg.to === currentChannel.id ||
                                msg.from === currentChannel.id)
                        )
                    })
                    .map((message) => (
                        <div
                            key={message.id}
                            className="mb-4 hover:bg-gray-50 p-2 rounded"
                        >
                            <div className="flex items-start gap-2">
                                <div
                                    className="w-8 h-8 bg-[#1164A3] text-white rounded-full flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        setSelectedUser(
                                            currentChannel.members.find(
                                                (u) =>
                                                    u._id === message.user._id
                                            )
                                        )
                                        setShowUserProfile(true)
                                    }}
                                >
                                    {message.user[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">
                                            {message.user}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {message.timestamp}
                                        </span>
                                    </div>

                                    {message.replyTo && (
                                        <div className="ml-4 mt-1 border-l-2 border-gray-300 pl-2 text-sm text-gray-500">
                                            Replying to{' '}
                                            {
                                                messages.find(
                                                    (m) =>
                                                        m.id === message.replyTo
                                                )?.user
                                            }
                                        </div>
                                    )}

                                    <p className="mt-1">{message.content}</p>

                                    {/* Reactions */}
                                    <div className="flex gap-2 mt-2">
                                        {message.reactions?.map(
                                            (reaction, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                                                    onClick={() =>
                                                        dispatch(
                                                            addReaction({
                                                                messageId:
                                                                    message.id,
                                                                reaction,
                                                            })
                                                        )
                                                    }
                                                >
                                                    <span>{reaction}</span>
                                                </div>
                                            )
                                        )}
                                        <div className="relative">
                                            <Smile
                                                className="w-4 h-4 text-gray-500 cursor-pointer"
                                                onClick={() =>
                                                    setShowEmojiPicker(
                                                        message.id
                                                    )
                                                }
                                            />
                                            {showEmojiPicker === message.id && (
                                                <EmojiPicker
                                                    messageId={message.id}
                                                    onClose={() =>
                                                        setShowEmojiPicker(
                                                            false
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Reply button */}
                                    <button
                                        className="text-gray-500 hover:text-gray-700 mt-2 flex items-center gap-1"
                                        onClick={() =>
                                            setReplyingTo(message.id)
                                        }
                                    >
                                        <Reply className="w-4 h-4" />
                                        Reply
                                    </button>

                                    {/* Replies */}
                                    {message.replies?.length > 0 && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {message.replies.map((reply) => (
                                                <div
                                                    key={reply.id}
                                                    className="flex items-start gap-2"
                                                >
                                                    <div className="w-6 h-6 bg-[#1164A3] text-white rounded-full flex items-center justify-center text-sm">
                                                        {reply.user[0]}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-sm">
                                                                {reply.user}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {
                                                                    reply.timestamp
                                                                }
                                                            </span>
                                                        </div>
                                                        <p className="text-sm">
                                                            {reply.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
                {replyingTo && (
                    <div className="mb-2 text-sm text-gray-500 flex items-center gap-2">
                        <Reply className="w-4 h-4" />
                        Replying to{' '}
                        {messages.find((m) => m.id === replyingTo)?.user}
                        <button
                            className="text-gray-700 hover:text-gray-900"
                            onClick={() => setReplyingTo(null)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) =>
                            e.key === 'Enter' && handleSendMessage()
                        }
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
        </div>
    )
}
export default ChatArea
