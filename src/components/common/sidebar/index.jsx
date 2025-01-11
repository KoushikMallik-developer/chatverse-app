import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createChannel,
    fetchChannels,
    setActiveChannel,
} from '../../../store/slices/channelSlice'
import {
    addMemberToWorkspace,
    removeMemberFromWorkspace,
} from '../../../store/slices/workspaceSlice'
import { createDM, getDMs } from '../../../store/slices/dmSlice'
import NameToAvatar from '../../../utils/name_to_avatar'

const SideBar = () => {
    const dispatch = useDispatch()
    const { channels, message, isLoading, currentWorkspace, currentChannel } =
        useSelector((state) => state.channel)
    const { dms } = useSelector((state) => state.dm)

    const { token, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(
            fetchChannels({ token: token, workspaceId: currentWorkspace._id })
        )
        dispatch(getDMs({ token: token, workspaceId: currentWorkspace._id }))
    }, [currentWorkspace, token])

    const [showUserProfile, setShowUserProfile] = useState(false)
    const [showAddChannelForm, setShowAddChannelForm] = useState(false)
    const [showAddMemberToWorkspaceForm, setShowAddMemberToWorkspaceForm] =
        useState(false)
    const [channel_name, setChannel_name] = useState('')
    const [channel_type, setChannel_type] = useState('')
    const [channel_description, setChannel_description] = useState('')
    const [showCreateDMForm, setShowCreateDMForm] = useState(false)

    const [selectedMember, setSelectedMember] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    const handleShowAddMemberToWorkspaceForm = () => {
        if (!showAddMemberToWorkspaceForm) {
            setShowAddMemberToWorkspaceForm(true)
        } else {
            handleAddNewMemberToWorkspace()
            setShowAddMemberToWorkspaceForm(false)
            setSelectedMember('')
        }
    }

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
    }
    const handleRemoveMemberFromWorkspace = () => {
        dispatch(
            removeMemberFromWorkspace({
                userData: {
                    workspaceId: currentWorkspace._id,
                    email: selectedMember,
                },
                token: token,
            })
        )
    }

    const handleCreateNewChannel = () => {
        dispatch(
            createChannel({
                channelData: {
                    name: channel_name,
                    type: channel_type,
                    description: channel_description,
                    workspaceId: currentWorkspace._id,
                },
                token: token,
            })
        )
        setShowAddChannelForm(false)
        setChannel_name('')
        setChannel_description('')
    }

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
        setShowCreateDMForm(false)
        setSelectedUser('')
    }

    const handleShowCreateDMForm = () => {
        setShowCreateDMForm(!showCreateDMForm)
    }
    return (
        <div className="w-60 bg-[#3f0e40] text-white p-4 text-center">
            <h1 className="font-bold text-2xl">{currentWorkspace.name}</h1>
            {showAddMemberToWorkspaceForm && (
                <form className="flex flex-col justify-center">
                    <input
                        type="email"
                        name="email"
                        placeholder="User Email"
                        className="bg-white p-2 rounded mb-2 text-gray-900 text-sm w-full"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    />
                </form>
            )}

            <button
                className="bg-amber-50 text-[#3f0e40] px-2 py-1 rounded text-xs mb-4 mt-2"
                onClick={handleShowAddMemberToWorkspaceForm}
            >
                Add Member
            </button>
            <hr></hr>
            {/* Channels */}
            <div className="mb-6 mt-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold">Channels</h2>
                    <button
                        className="bg-white text-[#3f0e40] px-2 py-1 rounded"
                        onClick={() => setShowAddChannelForm(true)}
                    >
                        <Plus className="w-4 h-4 cursor-pointer" />
                    </button>
                </div>
                <div>
                    {showAddChannelForm && (
                        <form
                            className="flex flex-col justify-center"
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleCreateNewChannel()
                            }}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Channel name"
                                className="bg-white p-2 rounded mb-2 text-gray-900 text-sm w-full"
                                value={channel_name}
                                onChange={(e) =>
                                    setChannel_name(e.target.value)
                                }
                            />
                            <select
                                id="type"
                                className="bg-white p-2 rounded mb-2 text-gray-900 text-sm placeholder-gray-400 w-full"
                                onSelect={(e) =>
                                    setChannel_type(e.target.value)
                                }
                            >
                                <option selected>Channel Type</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                            <input
                                type="text"
                                name="desc"
                                placeholder="Channel description"
                                className="bg-white p-2 rounded mb-2 text-gray-900 text-sm w-full"
                                value={channel_description}
                                onChange={(e) =>
                                    setChannel_description(e.target.value)
                                }
                            />
                            <div className="flex flex-row justify-center">
                                <button
                                    type="submit"
                                    className="bg-white text-[#3f0e40] px-2 py-1 rounded mb-2 w-1/3 mx-2"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className="bg-white text-[#3f0e40] px-2 py-1 rounded mb-2 w-1/3 mx-2"
                                    onClick={() => setShowAddChannelForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                {channels &&
                    channels instanceof Array &&
                    channels.map(
                        (channel) =>
                            channel.type !== 'dm' && (
                                <div
                                    key={channel._id}
                                    className={`flex items-center justify-between p-2 cursor-pointer rounded ${
                                        currentChannel.id === channel._id
                                            ? 'bg-[#1164A3]'
                                            : 'hover:bg-[#350d36]'
                                    }`}
                                    onClick={() =>
                                        dispatch(setActiveChannel(channel))
                                    }
                                >
                                    <span># {channel.name}</span>
                                    {channel.unread > 0 && (
                                        <span className="bg-red-500 rounded-full px-2 py-1 text-xs">
                                            {channel.unread}
                                        </span>
                                    )}
                                </div>
                            )
                    )}
            </div>

            {/* Direct Messages */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold">Direct Messages</h2>
                    <button
                        type="button"
                        className="bg-white text-[#3f0e40] px-2 py-1 rounded"
                        onClick={() => handleShowCreateDMForm()}
                    >
                        <Plus className="w-4 h-4 cursor-pointer" />
                    </button>
                </div>

                {showCreateDMForm && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleCreateNewDM()
                        }}
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <select
                                name="selectedUser"
                                className="bg-white p-2 rounded mb-2 text-gray-900 text-sm w-full"
                                placeholder="Select A User"
                                onChange={(e) =>
                                    setSelectedUser(e.target.value)
                                }
                            >
                                <option value="null" key="null">
                                    Select An User
                                </option>
                                {currentWorkspace.members &&
                                    currentWorkspace.members.map((user) => (
                                        <option value={user._id} key={user._id}>
                                            {user.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="flex flex-row justify-center">
                                <button
                                    type="submit"
                                    className="bg-white text-[#3f0e40] px-2 py-1 rounded mb-2 w-1/3 mx-2"
                                >
                                    Start
                                </button>
                                <button
                                    type="button"
                                    className="bg-white text-[#3f0e40] px-2 py-1 rounded mb-2 w-1/3 mx-2"
                                    onClick={() =>
                                        handleShowCreateDMForm(false)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}
                {dms &&
                    dms instanceof Array &&
                    dms.map(
                        (channel) =>
                            channel.type === 'dm' && (
                                <div
                                    key={channel._id}
                                    className={`flex items-center gap-2 p-2 cursor-pointer rounded ${
                                        currentChannel._id === channel._id
                                            ? 'bg-[#1164A3]'
                                            : 'hover:bg-[#350d36]'
                                    }`}
                                    onClick={() => {
                                        dispatch(setActiveChannel(channel))
                                        setShowUserProfile(true)
                                    }}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            channel.status === 'online'
                                                ? 'bg-green-500'
                                                : 'bg-gray-500'
                                        }`}
                                    />
                                    <NameToAvatar
                                        name={
                                            channel.members[0]._id !== user._id
                                                ? channel.members[0].name
                                                : channel.members[1].name
                                        }
                                        size={30}
                                    />
                                    <span>
                                        {channel.members[0]._id !== user._id
                                            ? channel.members[0].name
                                            : channel.members[1].name}
                                    </span>
                                </div>
                            )
                    )}
            </div>
        </div>
    )
}
export default SideBar
