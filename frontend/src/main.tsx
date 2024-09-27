import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/loginPage.tsx'
import RegisterPage from './pages/register/registerPage.tsx'
import DashboardPage from './pages/dashboard/dashboardPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import AdminDashboardPage from './pages/admin/adminDashboardPage.tsx'
import CreateNewUser from './pages/admin/createNewUser.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute requiredRole='admin'>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin/create-user',
                element: (
                    <ProtectedRoute requiredRole='admin'>
                        <CreateNewUser />
                    </ProtectedRoute>
                ),
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
