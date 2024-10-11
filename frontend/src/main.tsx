import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/loginPage.tsx'
import RegisterPage from './pages/register/registerPage.tsx'
import DashboardPage from './pages/dashboard/dashboardPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import AdminDashboardPage from './pages/admin/adminDashboardPage.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import CollectionPage from './pages/admin/collections/CollectionPage.tsx'
import UsersPage from './pages/admin/UsersPage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <App />
            </ThemeProvider>
        ),
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/admin-dashboard',
                element: (
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboardPage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: 'collections',
                        element: (
                            <ProtectedRoute requiredRole='admin'>
                                <CollectionPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'users',
                        element: (
                            <ProtectedRoute requiredRole='admin'>
                                <UsersPage />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
