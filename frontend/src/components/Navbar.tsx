import { useUserStore } from '@/store/useUserStore'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = useUserStore((state) => state.user)
    const clearUser = useUserStore((state) => state.clearUser)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
        console.log('Logged out')
    }

    const handleDashboardClick = () => {
        if (user?.roles.includes('admin')) {
            navigate('/admin-dashboard')
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <nav className="w-full">
            <ul className="w-full flex justify-evenly">
                <li>
                    <button onClick={handleDashboardClick}>Dashboard</button>
                </li>
                {user ? (
                    <li className="flex space-x-4">
                        <div>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </li>
                ) : (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
