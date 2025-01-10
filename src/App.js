import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Navbar from './pages/common/navbar'
import Dashboard from './pages/dashboard'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import WorkspaceList from './pages/workspaces'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import ProtectedRoute from './components/protected_component'
const App = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/workspaces" element={<WorkspaceList />} />
                        <Route path="/workspace/:id" element={<Dashboard />} />
                        <Route
                            path="/"
                            element={<Navigate to="/workspaces" replace />}
                        />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
