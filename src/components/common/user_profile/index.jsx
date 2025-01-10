import { X } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setActiveChat } from '../../../store/slices/chatSlice'

const UserProfile = ({ user }) => {
    const [showUserProfile, setShowUserProfile] = useState(false)
    const { users, activeChat } = useSelector((state) => state.chat)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User Profile</h2>
                    <X
                        className="cursor-pointer"
                        onClick={() => setShowUserProfile(false)}
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
                            {user.avatar}
                        </div>
                        <div>
                            <h3 className="font-bold">{user.name}</h3>
                            <p className="text-gray-500">{user.role}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Status: {user.status}</p>
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white rounded py-2"
                        onClick={() => {
                            setActiveChat({ type: 'dm', id: user.id })
                            setShowUserProfile(false)
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
