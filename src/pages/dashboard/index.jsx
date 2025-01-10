import React, { useState } from 'react'
import UserProfile from '../../components/common/user_profile'
import Sidebar from '../../components/common/sidebar'
import ChartArea from '../../components/chat_area'

const Dashboard = () => {
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <ChartArea />
                </div>
            </div>

            {/* User Profile Modal */}
            {showUserProfile && selectedUser && (
                <UserProfile user={selectedUser} />
            )}
        </>
    )
}
export default Dashboard
