import React, { useState } from 'react'
import { Edit, Search } from 'lucide-react'
import NameToAvatar from '../../utils/name_to_avatar'
import ChannelDetailsModal from '../dashboard/channel_detail_modal'
import { useDispatch, useSelector } from 'react-redux'
import { searchMessages } from '../../store/slices/chatSlice'

const ChatHeader = () => {
    const { currentChannel } = useSelector((state) => state.channel)
    const { user } = useSelector((state) => state.auth)
    const [showChannelDetailsModal, setShowChannelDetailsModal] =
        useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleShowChannelDetails = () => {
        setShowChannelDetailsModal(!showChannelDetailsModal)
    }
    const dispatch = useDispatch()
    const handleSearch = () => {
        dispatch(
            searchMessages({
                channelId: currentChannel._id,
                query: searchQuery,
            })
        )
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
                <div className="relative">
                    <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages"
                        className="bg-[#431e44] pl-8 pr-4 py-1 rounded text-sm focus:outline-none text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
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
