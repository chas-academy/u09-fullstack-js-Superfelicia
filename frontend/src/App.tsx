import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {
    return (
        <main className="w-full h-[100vh] flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </main>
    )
}

export default App
