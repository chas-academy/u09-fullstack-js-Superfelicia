import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {
    return (
        <main className='overflow-hidden'>
            <Header />
            <Outlet />
        </main>
    )
}

export default App
