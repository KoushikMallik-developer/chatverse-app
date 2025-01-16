// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { addReaction } from '../../../store/slices/chatSlice'
//
// const EmojiPicker = ({ messageId, onClose }) => {
//     const dispatch = useDispatch()
//     const emojis = ['👍', '❤️', '😊', '🎉', '🚀', '👏', '🔥']
//
//     return (
//         <div className="absolute bottom-full mb-2 bg-white shadow-lg rounded-lg p-2 flex gap-2">
//             {emojis.map((emoji) => (
//                 <button
//                     key={emoji}
//                     onClick={() => {
//                         dispatch(addReaction({ messageId, reaction: emoji }))
//                         onClose()
//                     }}
//                     className="hover:bg-gray-100 p-1 rounded"
//                 >
//                     {emoji}
//                 </button>
//             ))}
//         </div>
//     )
// }
//
// export default EmojiPicker
