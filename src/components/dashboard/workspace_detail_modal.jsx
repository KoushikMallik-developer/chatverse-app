import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2, UserPlus, UserMinus, LogOut } from 'lucide-react'
import {
    addMemberToWorkspace,
    removeMemberFromWorkspace,
    removeWorkspace,
} from '../../store/slices/workspaceSlice'

const WorkspaceDetailsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const [selectedMember, setSelectedMember] = useState('')

    const handleOnClose = () => {
        setSelectedMember('')
        onClose()
    }
    const handleRemoveMember = (memberId) => {
        dispatch(
            removeMemberFromWorkspace({
                userData: {
                    workspaceId: currentWorkspace._id,
                    members: [memberId],
                },
            })
        )
        handleOnClose()
    }

    const handleAddMember = () => {
        dispatch(
            addMemberToWorkspace({
                userData: {
                    workspaceId: currentWorkspace._id,
                    members: [selectedMember],
                },
            })
        )
        handleOnClose()
    }

    const handleLeaveWorkspace = () => {
        handleRemoveMember(user._id)
        onClose()
    }

    const handleDeleteWorkspace = () => {
        if (
            window.confirm(
                `Are you sure you want to delete workspace ${currentWorkspace.name}?`
            )
        ) {
            dispatch(removeWorkspace({ workspaceId: currentWorkspace._id }))
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Workspace Details</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">Name:</h3>
                    <p>{currentWorkspace.name}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Description:</h3>
                    <p>{currentWorkspace.description}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Members:</h3>
                    <ul>
                        {currentWorkspace.members.map((member) => (
                            <li
                                key={member._id}
                                className="flex justify-between items-center"
                            >
                                <span>{member.name}</span>
                                <button
                                    className="p-1 hover:bg-gray-100 rounded"
                                    onClick={() =>
                                        handleRemoveMember(member._id)
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
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDeleteWorkspace}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Workspace
                    </button>
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        onClick={handleLeaveWorkspace}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Leave Workspace
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleOnClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceDetailsModal
