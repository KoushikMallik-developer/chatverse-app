import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../store/slices/authSlice'
import {
    createWorkspace,
    fetchWorkspaces,
    removeWorkspace,
    setActiveWorkspace,
    updateWorkspace,
} from '../../store/slices/workspaceSlice'
import { useNavigate } from 'react-router-dom'
import { setUserOnline } from '../../store/slices/chatSlice'

const WorkspaceList = () => {
    const { token, user } = useSelector((state) => state.auth)
    const { workspaces } = useSelector((state) => state.workspace)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    const [editWorkspaceId, setEditWorkspaceId] = useState(null)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const handleEditWorkspace = (workspace) => {
        setEditWorkspaceId(workspace._id)
        setEditName(workspace.name)
        setEditDescription(workspace.description)
    }

    const handleUpdateWorkspace = () => {
        dispatch(
            updateWorkspace({
                workspaceData: {
                    id: editWorkspaceId,
                    name: editName,
                    description: editDescription,
                },
            })
        )
        setEditWorkspaceId(null)
        setEditName('')
        setEditDescription('')
    }

    useEffect(() => {
        dispatch(getUserDetails(token))
        dispatch(fetchWorkspaces(token))
    }, [token, dispatch])

    const handleCreateWorkspace = () => {
        dispatch(createWorkspace({ workspaceData: { name, description } }))
        setShowForm(false)
        setName('')
        setDescription('')
    }

    const handleGoToWorkspace = (workspace) => {
        dispatch(setActiveWorkspace(workspace))
        navigate(`/workspace/${workspace._id}`)
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Workspaces</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Workspace
                </button>
            </div>
            {showForm && (
                <form
                    className="mb-6"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleCreateWorkspace()
                    }}
                >
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace Name"
                        className="block w-full mb-2 p-2 border rounded"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Workspace Description"
                        className="block w-full mb-2 p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Workspace
                    </button>
                </form>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces && workspaces.length > 0
                    ? workspaces.map((workspace) => (
                          <div
                              key={workspace._id}
                              className="bg-white p-6 rounded-lg shadow-sm border"
                          >
                              <div className="flex justify-between items-start">
                                  <h3
                                      className="text-lg font-semibold cursor-pointer"
                                      onClick={() =>
                                          handleGoToWorkspace(workspace)
                                      }
                                  >
                                      {workspace.name}
                                  </h3>
                                  <div className="flex space-x-2">
                                      <button
                                          className="p-1 hover:bg-gray-100 rounded"
                                          onClick={() => {
                                              handleEditWorkspace(workspace)
                                          }}
                                      >
                                          <Edit className="w-4 h-4 text-gray-500" />
                                      </button>
                                      <button
                                          className="p-1 hover:bg-gray-100 rounded"
                                          onClick={() => {
                                              if (
                                                  window.confirm(
                                                      `Are you sure you want to delete workspace ${workspace.name}?`
                                                  )
                                              ) {
                                                  dispatch(
                                                      removeWorkspace({
                                                          workspaceId:
                                                              workspace._id,
                                                      })
                                                  )
                                              }
                                          }}
                                      >
                                          <Trash2 className="w-4 h-4 text-gray-500" />
                                      </button>
                                  </div>
                              </div>
                              <p className="text-gray-600 mt-2">
                                  {workspace.description}
                              </p>
                              {editWorkspaceId === workspace._id && (
                                  <form
                                      className="mt-4"
                                      onSubmit={(e) => {
                                          e.preventDefault()
                                          handleUpdateWorkspace()
                                      }}
                                  >
                                      <input
                                          type="text"
                                          value={editName}
                                          onChange={(e) =>
                                              setEditName(e.target.value)
                                          }
                                          placeholder="Workspace Name"
                                          className="block w-full mb-2 p-2 border rounded"
                                          required
                                      />
                                      <textarea
                                          value={editDescription}
                                          onChange={(e) =>
                                              setEditDescription(e.target.value)
                                          }
                                          placeholder="Workspace Description"
                                          className="block w-full mb-2 p-2 border rounded"
                                          required
                                      />
                                      <button
                                          type="submit"
                                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                      >
                                          Update Workspace
                                      </button>
                                  </form>
                              )}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    )
}
export default WorkspaceList
