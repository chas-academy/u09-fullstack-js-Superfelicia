import CalendarComponent from '@/components/CalendarComponent'
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

    const handleSlotSelect = (date: string, time: string) => {
        console.log(`Vald tid: ${date} kl. ${time}`);
        // Här kan du lägga till API-anrop för att tilldela frisör och tid
      };

    if (!user) return null

    return (
        <div className="flex flex-col justify-center space-y-5">
            <h2>Admin Dashboard</h2>
            <div className='w-full md:px-20 flex justify-center'>
                <CalendarComponent onSlotSelect={handleSlotSelect} />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboardPage
