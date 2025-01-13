import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createChannel } from '../../store/slices/channelSlice'

const CreateChannelModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const [channelName, setChannelName] = useState('')
    const [channelType, setChannelType] = useState('')
    const [channelDescription, setChannelDescription] = useState('')

    const handleCreateNewChannel = () => {
        dispatch(
            createChannel({
                name: channelName,
                type: channelType,
                description: channelDescription,
                workspaceId: currentWorkspace._id,
            })
        )
        handleOnClose()
    }
    const handleOnClose = () => {
        setChannelName('')
        setChannelDescription('')
        setChannelType('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Create Channel</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Channel name"
                    className="w-full p-2 border rounded mb-4 text-black bg-amber-50"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
                <select
                    id="type"
                    className="w-full p-2 border rounded mb-4 text-black bg-amber-50"
                    onChange={(e) => setChannelType(e.target.value)}
                >
                    <option value="">Channel Type</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <input
                    type="text"
                    name="desc"
                    placeholder="Channel description"
                    className="w-full p-2 border rounded mb-4 text-black bg-amber-50"
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleCreateNewChannel}
                    >
                        Add
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleOnClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateChannelModal
