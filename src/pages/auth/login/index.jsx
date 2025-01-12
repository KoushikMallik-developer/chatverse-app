import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../store/slices/authSlice'
import toast from 'react-hot-toast'
const Login = () => {
    const { isLoading, message, status_code, isLoggedIn, token } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLoginuser = () => {
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (status_code === 200 && isLoggedIn && token) {
            toast.success(message || 'Logged in successfully')
        }
        if (isLoggedIn) {
            navigate('/workspaces')
        }
    }, [isLoggedIn, status_code, message, navigate, token])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-gray-600">Sign in to ChatVerse</p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={handleLoginuser}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login
