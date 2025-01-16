import React, { useState } from 'react'
import { Edit } from 'lucide-react'
import NameToAvatar from '../../utils/name_to_avatar'
import ChannelDetailsModal from '../dashboard/channel_detail_modal'
import { useSelector } from 'react-redux'

const ChatHeader = () => {
    const { currentChannel } = useSelector((state) => state.channel)
    const { user } = useSelector((state) => state.auth)
    const [showChannelDetailsModal, setShowChannelDetailsModal] =
        useState(false)

    const handleShowChannelDetails = () => {
        setShowChannelDetailsModal(!showChannelDetailsModal)
    }
    return (
        <div>
            <div className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {currentChannel.type !== 'dm' ? (
                        <div className="flex items-center gap-8">
                            <span className="font-semibold">
                                # {currentChannel.name}
                            </span>
                            <button
                                className="p-1 hover:bg-gray-100 rounded"
                                onClick={handleShowChannelDetails}
                            >
                                <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <NameToAvatar
                                name={
                                    currentChannel.members[0]._id !== user._id
                                        ? currentChannel.members[0].name
                                        : currentChannel.members[1].name
                                }
                                size={30}
                            />
                            <span className="font-semibold">
                                {/*{currentChannel.name}*/}
                                {currentChannel.members[0]._id !== user._id
                                    ? currentChannel.members[0].name
                                    : currentChannel.members[1].name}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <ChannelDetailsModal
                isOpen={showChannelDetailsModal}
                onClose={handleShowChannelDetails}
            />
        </div>
    )
}
export default ChatHeader
