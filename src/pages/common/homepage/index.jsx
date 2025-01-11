import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const { isLoggedIn } = useSelector((state) => state.auth)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to ChatVerse
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Connect and collaborate with your team in real-time.
            </p>
            {!isLoggedIn && (
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    )
}

export default HomePage
