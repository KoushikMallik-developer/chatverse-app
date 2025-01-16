import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages, joinChannel } from '../../store/slices/chatSlice'

const Message = () => {
    const dispatch = useDispatch()
    const { currentChannelMessages } = useSelector((state) => state.chat)
    const { currentChannel } = useSelector((state) => state.channel)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (currentChannel?._id) {
            dispatch(joinChannel({ channelId: currentChannel._id, user: user }))
            dispatch(fetchMessages({ channelId: currentChannel._id }))
        }
    }, [currentChannel._id])
    return (
        <div className="flex-1 p-4">
            {currentChannelMessages &&
                currentChannelMessages.map((message) => (
                    <div
                        key={message._id}
                        className="mb-4 hover:bg-gray-50 p-2 rounded"
                    >
                        <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-[#1164A3] text-white rounded-full flex items-center justify-center cursor-pointer">
                                {message.sender.name}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                        {message.sender.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {message.timestamp}
                                    </span>
                                </div>
                                <p className="mt-1">{message.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
export default Message
