// import React, { useRef, useEffect } from 'react'
//
// const DrawingCanvas = () => {
//     const canvasRef = useRef(null)
//     const isDrawing = useRef(false)
//
//     useEffect(() => {
//         const canvas = canvasRef.current
//         const ctx = canvas.getContext('2d')
//         let lastX = 0
//         let lastY = 0
//
//         const draw = (e) => {
//             if (!isDrawing.current) return
//             ctx.beginPath()
//             ctx.moveTo(lastX, lastY)
//             ctx.lineTo(e.offsetX, e.offsetY)
//             ctx.stroke()
//             ;[lastX, lastY] = [e.offsetX, e.offsetY]
//         }
//
//         canvas.addEventListener('mousedown', (e) => {
//             isDrawing.current = true
//             ;[lastX, lastY] = [e.offsetX, e.offsetY]
//         })
//         canvas.addEventListener('mousemove', draw)
//         canvas.addEventListener('mouseup', () => (isDrawing.current = false))
//         canvas.addEventListener('mouseout', () => (isDrawing.current = false))
//
//         return () => {
//             canvas.removeEventListener('mousedown', () => {})
//             canvas.removeEventListener('mousemove', draw)
//             canvas.removeEventListener('mouseup', () => {})
//             canvas.removeEventListener('mouseout', () => {})
//         }
//     }, [])
//
//     return (
//         <canvas
//             ref={canvasRef}
//             width={800}
//             height={600}
//             className="border border-gray-300"
//         />
//     )
// }
//
// export default DrawingCanvas
