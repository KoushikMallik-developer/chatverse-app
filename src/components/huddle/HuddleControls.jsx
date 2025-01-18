// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     toggleHuddle,
//     toggleScreenShare,
//     toggleDrawing,
// } from '../../store/slices/chatSlice'
//
// const HuddleControls = () => {
//     const dispatch = useDispatch()
//     const huddleState = useSelector((state) => state.chat.huddleState)
//
//     const startScreenShare = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getDisplayMedia()
//             dispatch(toggleScreenShare())
//             // Handle stream
//         } catch (err) {
//             console.error('Screen share error:', err)
//         }
//     }
//
//     return (
//         <div className="flex gap-4">
//             <button
//                 onClick={() => dispatch(toggleHuddle())}
//                 className={`px-4 py-2 rounded ${huddleState.isActive ? 'bg-red-500' : 'bg-blue-500'} text-white`}
//             >
//                 {huddleState.isActive ? 'End Huddle' : 'Start Huddle'}
//             </button>
//
//             {huddleState.isActive && (
//                 <>
//                     <button
//                         onClick={startScreenShare}
//                         className="px-4 py-2 rounded bg-green-500 text-white"
//                     >
//                         {huddleState.isScreenSharing
//                             ? 'Stop Sharing'
//                             : 'Share Screen'}
//                     </button>
//
//                     <button
//                         onClick={() => dispatch(toggleDrawing())}
//                         className={`px-4 py-2 rounded ${huddleState.isDrawing ? 'bg-purple-500' : 'bg-gray-500'} text-white`}
//                     >
//                         {huddleState.isDrawing
//                             ? 'Stop Drawing'
//                             : 'Start Drawing'}
//                     </button>
//                 </>
//             )}
//         </div>
//     )
// }
//
// export default HuddleControls
