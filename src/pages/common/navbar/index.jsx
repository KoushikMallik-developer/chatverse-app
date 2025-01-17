import React, { useState } from 'react'
import { Bell, Search, Settings, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../store/slices/authSlice'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch()
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const { isLoggedIn } = useSelector((state) => state.auth)

    const logged_in_pages = [
        { url: 'workspaces', name: 'Workspaces' },
        { url: 'contact-us', name: 'Contact Us' },
    ]
    const logged_out_pages = [
        { url: 'login', name: 'Login' },
        { url: 'register', name: 'Register' },
    ]
    const pages = isLoggedIn ? logged_in_pages : logged_out_pages

    const { notifications } = useSelector((state) => state.chat)

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="bg-[#350d36] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-10">
                <Link to="/">
                    <h1 className="text-xl font-extrabold">Chatverse</h1>
                </Link>

                {pages.map((page) => (
                    <Link key={page.url} to={`/${page.url}`}>
                        <h1 className="text-md font-semibold">{page.name}</h1>
                    </Link>
                ))}
                {isLoggedIn && (
                    <h1
                        className="text-md font-semibold cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Bell
                        className="w-6 h-6 cursor-pointer"
                        onClick={() =>
                            dispatch({ type: 'CLEAR_NOTIFICATIONS' })
                        }
                    />
                    {notifications?.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </div>
                <Settings className="w-6 h-6 cursor-pointer" />
            </div>
        </nav>
    )
}
export default Navbar
