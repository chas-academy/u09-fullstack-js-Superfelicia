import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToggle'
import Header from './components/Header'

function App() {
    return (
        <main>
            <Header />
            HEJ APP
            <ModeToggle />
            <Outlet />
        </main>
    )
}

export default App
