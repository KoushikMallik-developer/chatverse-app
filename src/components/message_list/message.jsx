import { useState } from 'react'
import { format_timestamp } from '../../utils/format_timestamp'
import NameToAvatar from '../../utils/name_to_avatar'
import { useSelector } from 'react-redux'

export const Message = ({ message }) => {
    const [showActions, setShowActions] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const formatContent = (content) => {
        // Replace markdown-style formatting with HTML
        let formattedContent = content
            .replace(/\*([^*]+)\*/g, '<strong>$1</strong>') // Bold
            .replace(/_([^_]+)_/g, '<em>$1</em>') // Italic
            .replace(
                /`([^`]+)`/g,
                '<code class="bg-gray-100 text-gray-700 px-1 rounded">$1</code>'
            ) // Code
            .replace(/\n/g, '<br />') // Line breaks
            .replace(
                /\[([^\]]+)\]\(([^\)]+)\)/g,
                '<a href="$2" class="font-bold text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
            ) // Links

        return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    }

    return (
        <div
            className={`group flex gap-3 px-4 py-2 hover:bg-gray-900 bg-[#3f0e40] rounded-md items-center m-4 text-white ${message.sender._id === user._id ? 'bg-gray-500' : 'bg-[#3f0e40'}`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            <NameToAvatar name={message.sender.name} size={35} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{message.sender.name}</span>
                    <span className="text-sm text-gray-400">
                        {format_timestamp(message.createdAt)}
                    </span>
                </div>
                <div className="mt-1 textwhite">
                    {formatContent(message.content)}
                </div>
            </div>
        </div>
    )
}
