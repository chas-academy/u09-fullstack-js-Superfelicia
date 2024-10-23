import { Outlet } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const DashboardPage = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div className="w-full flex flex-col justify-center items-center">

            <div className='w-full md:px-20 flex justify-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardPage
