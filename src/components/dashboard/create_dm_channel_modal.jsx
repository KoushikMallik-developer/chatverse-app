import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDM } from '../../store/slices/dmSlice'

const CreateDMModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const [selectedUser, setSelectedUser] = useState('')

    const handleCreateNewDM = () => {
        dispatch(
            createDM({
                dmData: {
                    recipientId: selectedUser,
                    workspaceId: currentWorkspace._id,
                },
                token: token,
            })
        )
        handleOnClose()
    }
    const handleOnClose = () => {
        setSelectedUser('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">
                    Create Direct Message
                </h2>
                <select
                    name="selectedUser"
                    className="w-full p-2 border rounded mb-4 text-black bg-amber-50"
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">Select A User</option>
                    {currentWorkspace.members &&
                        currentWorkspace.members.map((user) => (
                            <option value={user._id} key={user._id}>
                                {user.name}
                            </option>
                        ))}
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleCreateNewDM}
                    >
                        Start
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

export default CreateDMModal
