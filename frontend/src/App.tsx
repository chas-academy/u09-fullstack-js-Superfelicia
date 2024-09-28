import { Outlet } from 'react-router-dom'
import './App.css'
import { ModeToggle } from './components/ModeToggle'

function App() {
    return (
        <main>
            HEJ APP
            <ModeToggle />
            <Outlet />
        </main>
    )
}

export default App
