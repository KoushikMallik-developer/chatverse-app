import ChatHeader from '../chat_header'
import Message from '../message'
import MessageInput from './message_input'
import { useSelector } from 'react-redux'
import WorkspaceHome from './workspace_home'

const ChatArea = () => {
    const { currentChannel } = useSelector((state) => state.channel)
    return (
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
            {currentChannel ? (
                <>
                    {/*Chat header*/}
                    <ChatHeader />
                    {/* Messages */}
                    <Message />

                    {/* Message Input */}
                    <MessageInput />
                </>
            ) : (
                <WorkspaceHome />
            )}
        </div>
    )
}
export default ChatArea
