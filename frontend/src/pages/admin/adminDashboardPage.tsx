import UserCollectionTable from '@/components/userCollectionTable'
import { useUserStore } from '../../store/useUserStore'
import { Outlet, useLocation } from 'react-router-dom'

const AdminDashboardPage = () => {
    const user = useUserStore((state) => state.user)
    const location = useLocation()

    if (!user) return null

    const showUserTable = location.pathname === '/admin-dashboard'

    return (
        <div className="flex flex-col justify-center space-y-5">
            {showUserTable && (
                <div className='flex items-start justify-center md:px-10 space-x-10'>
                    <div className='flex w-[900px] h-[600px] border justify-center items-center'>
                        Statistic & grabbarna här i framtiden
                    </div>
                    <UserCollectionTable />
                </div>
            )}

            <div className="w-full md:px-20 flex justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboardPage
