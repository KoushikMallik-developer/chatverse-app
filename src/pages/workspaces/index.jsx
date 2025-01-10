import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const WorkspaceList = () => {
    const [workspaces, setWorkspaces] = useState([
        {
            id: 1,
            name: 'Engineering Team',
            description: 'Technical discussions and updates',
        },
        {
            id: 2,
            name: 'Marketing',
            description: 'Campaign planning and coordination',
        },
    ])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Workspaces</h1>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    <Plus className="w-5 h-5 mr-2" />
                    New Workspace
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((workspace) => (
                    <div
                        key={workspace.id}
                        className="bg-white p-6 rounded-lg shadow-sm border"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold">
                                {workspace.name}
                            </h3>
                            <div className="flex space-x-2">
                                <button className="p-1 hover:bg-gray-100 rounded">
                                    <Edit className="w-4 h-4 text-gray-500" />
                                </button>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                    <Trash2 className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-2">
                            {workspace.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorkspaceList
