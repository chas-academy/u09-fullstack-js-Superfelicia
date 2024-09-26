import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/useUserStore"

const AdminDashboardPage = () => {
    const navigate = useNavigate()
    const user = useUserStore((state) => state.user)
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
        console.log('Logged out')
    }

    if (!user) return null

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user.name}</p>
            <p>Your role: {user.roles.join(', ')}</p>


            <div className="flex flex-col">
                <h3>Manage users</h3>
                <button>Create user</button>
                <button>Update user</button>
                <button>Delete user</button>
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminDashboardPage