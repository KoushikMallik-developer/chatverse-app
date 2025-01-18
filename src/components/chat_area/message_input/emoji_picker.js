const EmojiPicker = ({ onSelect, onClose }) => {
    const emojis = ['😀', '😊', '👍', '❤️', '🎉', '🔥', '😎', '🤔', '👏', '✨']

    return (
        <div className="absolute bottom-full mb-2 p-2 bg-white rounded-lg shadow-lg border">
            <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => {
                            onSelect(emoji)
                            onClose()
                        }}
                        className="p-2 hover:bg-gray-100 rounded"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default EmojiPicker
