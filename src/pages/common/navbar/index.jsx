import React, { useState } from 'react'
import { Bell, Search, Settings, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch()
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const { users, notifications } = useSelector((state) => state.chat)

    return (
        <>
            <nav className="bg-[#350d36] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Chatverse</h1>
                    <div className="relative">
                        <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Chatverse"
                            className="bg-[#431e44] pl-8 pr-4 py-1 rounded text-sm focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell
                            className="w-6 h-6 cursor-pointer"
                            onClick={() =>
                                dispatch({ type: 'CLEAR_NOTIFICATIONS' })
                            }
                        />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                    <User
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                            setSelectedUser(users.find((u) => u.id === 1)) // Current user
                            setShowUserProfile(true)
                        }}
                    />
                    <Settings className="w-6 h-6 cursor-pointer" />
                </div>
            </nav>
        </>
    )
}
export default Navbar
