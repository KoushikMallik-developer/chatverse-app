import { useState, useRef } from 'react'
import {
    Smile,
    Paperclip,
    Bold,
    Italic,
    Code,
    ListOrdered,
    Link2,
} from 'lucide-react'
import EmojiPicker from './emoji_picker'
import { sendMessage } from '../../../store/slices/chatSlice'
import { useDispatch, useSelector } from 'react-redux'

const MessageInput = () => {
    const [message, setMessage] = useState('')
    const [showFormatting, setShowFormatting] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const textareaRef = useRef(null)

    const { currentChannel } = useSelector((state) => state.channel)
    const { user } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSend = () => {
        if (!message.trim()) return
        dispatch(
            sendMessage({
                channelId: currentChannel._id,
                senderId: user._id,
                content: message,
            })
        )
        if (textareaRef.current) {
            textareaRef.current.style.height = '44px'
        }
        setMessage('')
    }

    const insertFormatting = (format) => {
        if (!textareaRef.current) return

        const textarea = textareaRef.current
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = message

        let formatText = ''
        switch (format) {
            case 'bold':
                formatText = `*${text.substring(start, end) || 'bold text'}*`
                break
            case 'italic':
                formatText = `_${text.substring(start, end) || 'italic text'}_`
                break
            case 'code':
                formatText = `\`${text.substring(start, end) || 'code'}\``
                break
            case 'list':
                formatText = `\n• ${text.substring(start, end) || 'list item'}`
                break
            case 'link':
                formatText = `[${text.substring(start, end) || 'link text'}](url)`
                break
            default:
                break
        }

        const newText =
            text.substring(0, start) + formatText + text.substring(end)
        setMessage(newText)

        requestAnimationFrame(() => {
            textarea.focus()
            const newPosition = start + formatText.length
            textarea.setSelectionRange(newPosition, newPosition)
        })
    }

    const autoResize = () => {
        if (!textareaRef.current) return

        const textarea = textareaRef.current
        textarea.style.height = '44px'
        const scrollHeight = textarea.scrollHeight
        textarea.style.height = `${Math.min(scrollHeight, 200)}px`
    }

    return (
        <div className="w-full flex items-end justify-center bg-[#350d36] p-4">
            <div className="w-full max-w-5xl border rounded-lg shadow-sm bg-white">
                {showFormatting && (
                    <div className="flex items-center gap-2 px-4 py-2 border-b bg-white">
                        <button
                            onClick={() => insertFormatting('bold')}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Bold className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => insertFormatting('italic')}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Italic className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => insertFormatting('code')}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Code className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => insertFormatting('list')}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <ListOrdered className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => insertFormatting('link')}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Link2 className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="flex items-end p-2 bg-white rounded-lg relative">
                    <div className="flex-grow relative">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value)
                                autoResize()
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder={`Message ${
                                currentChannel.type !== 'dm'
                                    ? '#' + currentChannel.name
                                    : currentChannel.members[0]._id !== user._id
                                      ? currentChannel.members[0].name
                                      : currentChannel.members[1].name
                            }`}
                            className="w-full resize-none overflow-y-auto min-h-[44px] max-h-[200px] px-3 py-2 text-sm focus:outline-none border-0"
                            style={{ height: '44px' }}
                        />

                        {showEmojiPicker && (
                            <EmojiPicker
                                onSelect={(emoji) => {
                                    setMessage((prev) => prev + emoji)
                                }}
                                onClose={() => setShowEmojiPicker(false)}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 px-2">
                        <button
                            onClick={() => setShowFormatting(!showFormatting)}
                            className={`p-2 rounded hover:bg-gray-100 ${showFormatting ? 'bg-gray-100' : ''}`}
                        >
                            <Bold className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-2 rounded hover:bg-gray-100"
                        >
                            <Smile className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-2 rounded hover:bg-gray-100">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            onClick={handleSend}
                            className={`px-4 py-1.5 rounded font-medium ${
                                message.trim()
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!message.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageInput
