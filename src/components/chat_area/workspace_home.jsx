// WorkspacePage.jsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import WorkspaceDetailsModal from '../dashboard/workspace_detail_modal'

const WorkspaceHome = () => {
    const { currentWorkspace } = useSelector((state) => state.workspace)
    const [showWorkspaceDetailsModal, setShowWorkspaceDetailsModal] =
        useState(false)

    const handleShowWorkspaceDetailsModal = () => {
        setShowWorkspaceDetailsModal(!showWorkspaceDetailsModal)
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
            <h1 className="text-3xl font-bold mb-4">{currentWorkspace.name}</h1>
            <p className="text-lg mb-4">{currentWorkspace.description}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleShowWorkspaceDetailsModal}
            >
                View Workspace Details
            </button>
            <p className="text-gray-500 mt-4">
                Please select a channel to start messaging.
            </p>
            <WorkspaceDetailsModal
                isOpen={showWorkspaceDetailsModal}
                onClose={handleShowWorkspaceDetailsModal}
            />
        </div>
    )
}

export default WorkspaceHome
