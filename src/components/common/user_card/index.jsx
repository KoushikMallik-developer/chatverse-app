// UserCard.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import NameToAvatar from '../../../utils/name_to_avatar'

const UserCard = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="flex items-center bg-[#350d36] rounded mt-4 p-4">
            <NameToAvatar name={user.name} size={45} />
            <div className="m-4">
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
        </div>
    )
}

export default UserCard
