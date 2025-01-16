// SideBar.jsx
import React, { useEffect, useState } from 'react'
import { Edit, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchChannels,
    setActiveChannel,
} from '../../../store/slices/channelSlice'
import { getDMs } from '../../../store/slices/dmSlice'
import NameToAvatar from '../../../utils/name_to_avatar'
import AddMemberModal from '../../dashboard/add_member_to_workspace_modal'
import CreateChannelModal from '../../dashboard/create_channel_modal'
import CreateDMModal from '../../dashboard/create_dm_channel_modal'
import WorkspaceDetailsModal from '../../dashboard/workspace_detail_modal'
import UserCard from '../user_card'
import { joinChannel, leaveChannel } from '../../../store/slices/chatSlice'

const SideBar = () => {
    const dispatch = useDispatch()
    const { channels, currentChannel } = useSelector((state) => state.channel)
    const { dms } = useSelector((state) => state.dm)
    const { currentWorkspace } = useSelector((state) => state.workspace)
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
    const [showCreateDMForm, setShowCreateDMForm] = useState(false)
    const [showWorkspaceDetailsModal, setShowWorkspaceDetailsModal] =
        useState(false)

    const handleShowAddMemberToWorkspaceForm = () => {
        setShowAddMemberToWorkspaceForm(!showAddMemberToWorkspaceForm)
    }
    const handleShowAddChannelForm = () => {
        setShowAddChannelForm(!showAddChannelForm)
    }

    const handleShowWorkspaceDetailsModal = () => {
        setShowWorkspaceDetailsModal(!showWorkspaceDetailsModal)
    }

    const handleShowCreateDMForm = () => {
        setShowCreateDMForm(!showCreateDMForm)
    }

    const handleGoToWorkspaceHomePage = () => {
        dispatch(setActiveChannel(null))
    }
    const handleOnClickChannel = (channel) => {
        if (currentChannel) {
            dispatch(
                leaveChannel({ channelId: currentChannel._id, user: user })
            )
        }
        dispatch(setActiveChannel(channel))
    }

    return (
        <div className="w-60 bg-[#3f0e40] text-white flex flex-col justify-between h-full">
            <div className="p-4">
                <div className="flex justify-between items-center align-middle">
                    <h1
                        className="font-bold text-2xl self-center cursor-pointer"
                        onClick={handleGoToWorkspaceHomePage}
                    >
                        {currentWorkspace.name}
                    </h1>
                    <div className="flex space-x-2">
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={handleShowAddMemberToWorkspaceForm}
                        >
                            <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={handleShowWorkspaceDetailsModal}
                        >
                            <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <hr className="my-5"></hr>
                {/* Channels */}
                <div className="mb-6 mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">Channels</h2>
                        <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={handleShowAddChannelForm}
                        >
                            <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                    {channels &&
                        channels instanceof Array &&
                        channels.map(
                            (channel) =>
                                channel.type !== 'dm' && (
                                    <div
                                        key={channel._id}
                                        className={`flex items-center justify-between p-2 cursor-pointer rounded ${
                                            currentChannel?._id === channel._id
                                                ? 'bg-[#1164A3]'
                                                : 'hover:bg-[#350d36]'
                                        }`}
                                        onClick={() =>
                                            handleOnClickChannel(channel)
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
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => handleShowCreateDMForm()}
                        >
                            <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                    {dms &&
                        dms instanceof Array &&
                        dms.map(
                            (channel) =>
                                channel.type === 'dm' && (
                                    <div
                                        key={channel._id}
                                        className={`flex items-center gap-2 p-2 cursor-pointer rounded ${
                                            currentChannel?._id === channel._id
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
                                                channel.members[0]._id !==
                                                user._id
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
            <UserCard />
            {/*Modal form to add members to workspace*/}
            <AddMemberModal
                isOpen={showAddMemberToWorkspaceForm}
                onClose={handleShowAddMemberToWorkspaceForm}
            />
            {/*Modal form to create new channel in workspace*/}
            <CreateChannelModal
                isOpen={showAddChannelForm}
                onClose={handleShowAddChannelForm}
            />
            {/*Modal form to create new dm in workspace*/}
            <CreateDMModal
                isOpen={showCreateDMForm}
                onClose={handleShowCreateDMForm}
            />
            <WorkspaceDetailsModal
                isOpen={showWorkspaceDetailsModal}
                onClose={handleShowWorkspaceDetailsModal}
            />
        </div>
    )
}

export default SideBar
