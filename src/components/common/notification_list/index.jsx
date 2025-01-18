import React, { useState } from 'react'
import { Bell, Circle, Mail, UserPlus, Star } from 'lucide-react'

const NotificationsDropdown = ({ isOpen }) => {
    const notifications = [
        {
            id: 1,
            type: 'message',
            content: 'Sarah sent you a message',
            time: '5m ago',
            unread: true,
        },
        {
            id: 2,
            type: 'follow',
            content: 'John started following you',
            time: '1h ago',
            unread: true,
        },
        {
            id: 3,
            type: 'like',
            content: 'Your post received 50 likes',
            time: '2h ago',
            unread: false,
        },
        {
            id: 4,
            type: 'message',
            content: 'New team message from Alex',
            time: '3h ago',
            unread: false,
        },
    ]

    const getIcon = (type) => {
        switch (type) {
            case 'message':
                return <Mail className="w-4 h-4 text-blue-500" />
            case 'follow':
                return <UserPlus className="w-4 h-4 text-green-500" />
            case 'like':
                return <Star className="w-4 h-4 text-yellow-500" />
            default:
                return null
        }
    }

    const unreadCount = notifications.filter((n) => n.unread).length

    return (
        <div className="relative">
            {/* Notification Bell Button */}
            {/*<button*/}
            {/*  onClick={() => setIsOpen(!isOpen)}*/}
            {/*  className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*>*/}
            {/*  <Bell className="w-6 h-6 text-gray-600" />*/}
            {/*  {unreadCount > 0 && (*/}
            {/*    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">*/}
            {/*      {unreadCount}*/}
            {/*    </span>*/}
            {/*  )}*/}
            {/*</button>*/}

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 w-80 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Notifications
                        </h3>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex items-start p-4 hover:bg-gray-50 transition-colors duration-150"
                            >
                                <div className="flex-shrink-0 pt-1">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm text-gray-900">
                                        {notification.content}
                                        {notification.unread && (
                                            <Circle className="inline-block w-2 h-2 ml-2 text-blue-500 fill-current" />
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {notification.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-100">
                        <button className="w-full text-sm text-blue-500 hover:text-blue-600 font-medium">
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationsDropdown
