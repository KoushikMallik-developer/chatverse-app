import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import Navbar from './pages/common/navbar'
import Dashboard from './pages/dashboard'

const App = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <Dashboard />
        </Provider>
    )
}

export default App
