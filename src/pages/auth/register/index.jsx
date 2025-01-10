import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    registerUser,
    setMessageAndStatusCode,
} from '../../../store/slices/authSlice'
const Register = () => {
    const { isLoading, message, status_code, isLoggedIn } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegisterUser = () => {
        if (
            !name ||
            name === '' ||
            !email ||
            email === '' ||
            !password ||
            password === ''
        ) {
            dispatch(
                setMessageAndStatusCode({
                    message: 'Name, Email and Password are required',
                    status_code: 422,
                })
            )
        } else {
            dispatch(registerUser({ name, email, password }))
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/workspaces')
        }
    }, [isLoggedIn])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-gray-600">Join ChatVerse today</p>
                </div>

                {status_code && status_code === 201 && (
                    <div
                        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        {message}
                    </div>
                )}
                {status_code && status_code !== 201 && (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        {message}
                    </div>
                )}

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        disabled={isLoading}
                        onClick={handleRegisterUser}
                    >
                        {isLoading ? 'Loading...' : 'Sign up'}
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Register
