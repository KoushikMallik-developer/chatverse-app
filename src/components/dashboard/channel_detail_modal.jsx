// ChannelDetailsModal.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2, UserPlus, UserMinus } from 'lucide-react'
import { removeChannel, updateChannel } from '../../store/slices/channelSlice'
import {
    addMemberToChannel,
    removeMemberFromChannel,
} from '../../store/slices/channelSlice'

const ChannelDetailsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const { currentChannel } = useSelector((state) => state.channel)
    const [selectedMember, setSelectedMember] = useState('')
    const [channelName, setChannelName] = useState(currentChannel.name)
    const [channelDescription, setChannelDescription] = useState(
        currentChannel.description
    )
    const [channelType, setChannelType] = useState(currentChannel.type)

    useEffect(() => {
        setChannelName(currentChannel.name)
        setChannelDescription(currentChannel.description)
        setChannelType(currentChannel.type)
    }, [currentChannel])

    const handleRemoveMember = (memberId) => {
        dispatch(
            removeMemberFromChannel({
                channelId: currentChannel._id,
                userEmail: memberId,
            })
        )
    }

    const handleAddMember = () => {
        dispatch(
            addMemberToChannel({
                channelId: currentChannel._id,
                userEmail: selectedMember,
            })
        )
        setSelectedMember('')
    }

    const handleDeleteChannel = () => {
        if (
            window.confirm(
                `Are you sure you want to delete channel ${currentChannel.name}?`
            )
        ) {
            dispatch(removeChannel({ channelId: currentChannel._id }))
            onClose()
        }
    }

    const handleUpdateChannel = () => {
        dispatch(
            updateChannel({
                channelId: currentChannel._id,
                name: channelName,
                description: channelDescription,
            })
        )
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Channel Details</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">Name:</h3>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Description:</h3>
                    <textarea
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Type:</h3>
                    <select
                        value={channelType}
                        onChange={(e) => setChannelType(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Members:</h3>
                    <ul>
                        {currentChannel.members.map((member) => (
                            <li
                                key={member._id}
                                className="flex justify-between items-center text-black"
                            >
                                <span>{member.name}</span>
                                <button
                                    className="p-1 hover:bg-gray-100 rounded"
                                    onClick={() =>
                                        handleRemoveMember(member.email)
                                    }
                                >
                                    <UserMinus className="w-4 h-4 text-gray-500" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Add Member:</h3>
                    <input
                        type="email"
                        name="email"
                        placeholder="User Email"
                        className="w-full p-2 border rounded mb-4"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddMember}
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Member
                    </button>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdateChannel}
                    >
                        Update Channel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDeleteChannel}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Channel
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChannelDetailsModal
