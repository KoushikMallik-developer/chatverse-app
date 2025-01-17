import './App.css'
import { store } from './store/store'
import { Provider, useDispatch } from 'react-redux'
import Navbar from './pages/common/navbar'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import WorkspaceList from './pages/workspaces'
import HomePage from './pages/common/homepage'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/protected_component'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { resetMessages } from './store/slices/authSlice'
import { resetSearchResult } from './store/slices/chatSlice'
import { cleanActiveChannel } from './store/slices/channelSlice'

const App = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(resetMessages()) // Reset messages on route change
        dispatch(resetSearchResult())
        dispatch(cleanActiveChannel())
    }, [location.pathname, dispatch]) // Trigger when route changes

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/workspaces" element={<WorkspaceList />} />
                    <Route path="/workspace/:id" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
