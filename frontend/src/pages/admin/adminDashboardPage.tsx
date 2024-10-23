import { useUserStore } from '../../store/useUserStore'
import { Outlet } from 'react-router-dom'

export interface User {
    _id: string
    name: string
    email: string
    roles: string[]
    [key: string]: any
}

const AdminDashboardPage = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div className="flex flex-col justify-center space-y-5">
            <div className='w-full md:px-20 flex justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboardPage
