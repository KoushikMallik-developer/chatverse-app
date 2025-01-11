import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Navbar from './pages/common/navbar'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import WorkspaceList from './pages/workspaces'
import HomePage from './pages/common/homepage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protected_component'

const App = () => {
    return (
        <Router>
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
        </Router>
    )
}

export default App
