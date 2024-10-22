import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/loginPage.tsx'
import RegisterPage from './pages/register/registerPage.tsx'
import DashboardPage from './pages/dashboard/dashboardPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import AdminDashboardPage from './pages/admin/adminDashboardPage.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import CollectionPage from './pages/admin/collections/CollectionPage.tsx'
import UsersPage from './pages/admin/UsersPage.tsx'
import CollectionsOverview from './pages/dashboard/collections/CollectionsOverview.tsx'
import CollectionView from './pages/dashboard/collections/CollectionView.tsx'
import StartPage from './pages/dashboard/collections/StartPage.tsx'
import UserProfilePage from './pages/dashboard/UserProfilePage.tsx'
import AdminProfilePage from './pages/admin/AdminProfilePage.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        ),
        children: [
            { path: '/', element: <Navigate to="/login" replace/> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: '/dashboard/profile',
                        element: (
                            <ProtectedRoute>
                                <UserProfilePage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'collections-overview',
                        element: (
                            <ProtectedRoute>
                                <CollectionsOverview />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'collections/:collectionId',
                        element: (
                            <ProtectedRoute>
                                <CollectionView />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'collections/:collectionId/start',
                        element: (
                            <ProtectedRoute>
                                <StartPage />
                            </ProtectedRoute>
                        ),
                    },
                ],
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
                        path: '/admin-dashboard/profile',
                        element: (
                            <ProtectedRoute>
                                <AdminProfilePage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'collections',
                        element: (
                            <ProtectedRoute requiredRole="admin">
                                <CollectionPage />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'users',
                        element: (
                            <ProtectedRoute requiredRole="admin">
                                <UsersPage />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
