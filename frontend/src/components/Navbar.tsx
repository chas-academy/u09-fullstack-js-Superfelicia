import { useUserStore } from '@/store/useUserStore'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'

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
        <nav className="w-full flex items-center justify-end">
            <div>
                {user && (
                    <ul className="flex justify-evenly items-center space-x-4">
                        <li>
                            <button onClick={handleDashboardClick}>Dashboard</button>
                        </li>
                        {user?.roles.includes('admin') && (
                            <>
                                <li>
                                    <Link to="/admin-dashboard/users">Manage users</Link>
                                </li>
                                <li>
                                    <Link to="/admin-dashboard/collections">
                                        Manage collections
                                    </Link>
                                </li>
                            </>
                        )}
                        {user?.roles.includes('user') && (
                            <li>
                                <Link to="/dashboard/collections-overview">Collections</Link>
                            </li>
                        )}
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
                            <ul>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </ul>
                        )}

                        <ModeToggle />
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar
