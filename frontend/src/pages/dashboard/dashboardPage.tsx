import { Outlet } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const DashboardPage = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div>
            <h2>User dashboard</h2>
            <p>Welcome to your dashboard, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your role: {user.roles.join(', ')}</p>

            <Outlet />
        </div>
    )
}

export default DashboardPage
