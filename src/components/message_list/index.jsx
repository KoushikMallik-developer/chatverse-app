import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchMessages,
    joinChannel,
    resetSearchResult,
} from '../../store/slices/chatSlice'
import { Message } from './message'

const MessageList = () => {
    const dispatch = useDispatch()
    const { currentChannelMessages, searchMessagesResult } = useSelector(
        (state) => state.chat
    )
    const { currentChannel } = useSelector((state) => state.channel)
    const { user } = useSelector((state) => state.auth)
    const messageListRef = useRef(null)

    useEffect(() => {
        if (currentChannel?._id) {
            dispatch(joinChannel({ channelId: currentChannel._id, user: user }))
            dispatch(fetchMessages({ channelId: currentChannel._id }))
        }
    }, [currentChannel._id])

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight
        }
    }, [currentChannelMessages, searchMessagesResult])

    const handleResetSearch = () => {
        dispatch(resetSearchResult())
    }

    return (
        <div
            className="flex-1 p-4 overflow-y-auto scrollbar-hide"
            ref={messageListRef}
        >
            <div>
                {searchMessagesResult && searchMessagesResult.length > 0 ? (
                    <>
                        {searchMessagesResult.map((message) => (
                            <div
                                className={`flex flex-col ${message.sender._id === user._id ? 'items-end' : 'items-start'}`}
                            >
                                <Message message={message} key={message._id} />
                            </div>
                        ))}
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleResetSearch}
                                className="bg-[#350d36] text-white px-4 py-2 rounded-md hover:bg-[#0f5a9e] max-w-28 "
                            >
                                Close
                            </button>
                        </div>
                    </>
                ) : (
                    currentChannelMessages &&
                    currentChannelMessages.map((message) => (
                        <div
                            className={`flex flex-col ${message.sender._id === user._id ? 'items-end' : 'items-start'}`}
                        >
                            <Message message={message} key={message._id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MessageList
