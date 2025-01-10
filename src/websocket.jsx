export class WebSocketManager {
    constructor(url, onMessage) {
        this.url = url
        this.onMessage = onMessage
        this.socket = null
    }

    connect() {
        this.socket = new WebSocket(this.url)

        this.socket.onopen = () => {
            console.log('WebSocket connected')
        }

        this.socket.onmessage = (event) => {
            this.onMessage(JSON.parse(event.data))
        }

        this.socket.onclose = () => {
            console.log('WebSocket disconnected')
            // Attempt to reconnect
            setTimeout(() => this.connect(), 5000)
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message))
        } else {
            console.error('WebSocket is not open. Message not sent:', message)
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close()
        }
    }
}
