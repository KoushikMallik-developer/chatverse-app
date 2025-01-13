import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMemberToWorkspace } from '../../store/slices/workspaceSlice'

const AddMemberModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const [selectedMember, setSelectedMember] = useState('')

    const handleAddNewMemberToWorkspace = () => {
        dispatch(
            addMemberToWorkspace({
                userData: {
                    workspaceId: currentWorkspace._id,
                    members: [selectedMember],
                },
                token: token,
            })
        )
        handleOnClose()
    }
    const handleOnClose = () => {
        setSelectedMember('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">
                    Add Member to Workspace
                </h2>
                <input
                    type="email"
                    name="email"
                    placeholder="User Email"
                    className="w-full p-2 border rounded mb-4 text-black bg-amber-50"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddNewMemberToWorkspace}
                    >
                        Add Member
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

export default AddMemberModal
