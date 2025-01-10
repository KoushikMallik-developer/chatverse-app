import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { setActiveChat } from '../../../store/slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {
    const dispatch = useDispatch()
    const { channels, users, activeChat } = useSelector((state) => state.chat)

    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    return (
        <div className="w-60 bg-[#3f0e40] text-white p-4">
            {/* Channels */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold">Channels</h2>
                    <Plus className="w-4 h-4 cursor-pointer" />
                </div>
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        className={`flex items-center justify-between p-2 cursor-pointer rounded ${
                            activeChat.type === 'channel' &&
                            activeChat.id === channel.id
                                ? 'bg-[#1164A3]'
                                : 'hover:bg-[#350d36]'
                        }`}
                        onClick={() =>
                            dispatch(
                                setActiveChat({
                                    type: 'channel',
                                    id: channel.id,
                                })
                            )
                        }
                    >
                        <span># {channel.name}</span>
                        {channel.unread > 0 && (
                            <span className="bg-red-500 rounded-full px-2 py-1 text-xs">
                                {channel.unread}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Direct Messages */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold">Direct Messages</h2>
                    <Plus className="w-4 h-4 cursor-pointer" />
                </div>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`flex items-center gap-2 p-2 cursor-pointer rounded ${
                            activeChat.type === 'dm' &&
                            activeChat.id === user.id
                                ? 'bg-[#1164A3]'
                                : 'hover:bg-[#350d36]'
                        }`}
                        onClick={() => {
                            setSelectedUser(user)
                            setShowUserProfile(true)
                        }}
                    >
                        <div
                            className={`w-2 h-2 rounded-full ${
                                user.status === 'online'
                                    ? 'bg-green-500'
                                    : 'bg-gray-500'
                            }`}
                        />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SideBar
