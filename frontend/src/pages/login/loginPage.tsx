import FormComponent from '../../components/formComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { useState } from 'react'
import { API_URL } from '@/config'
import { useCollectionsStore } from '@/store/useCollectionsStore'

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null)
    const setUser = useUserStore((state) => state.setUser)
    const setUsers = useUserStore((state) => state.setUsers)
    const fetchCollectionsForAdmin = useCollectionsStore((state) => state.fetchCollectionsForAdmin)
    const fetchCollectionsForUser = useCollectionsStore((state) => state.fetchCollectionsForUser)
    const navigate = useNavigate()

    const loginFields = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            name: 'email',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
        },
    ]

    const handleLogin = async (formData: { [key: string]: string }) => {
        const { email, password } = formData

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            console.log('Response data:', data)

            if (response.ok) {
                // Spara tokenen lokalt (t.ex. i localStorage)
                localStorage.setItem('token', data.token)
                setUser(data.user)

                if (data.user.roles.includes('admin')) {
                    await fetchCollectionsForAdmin()
                    console.log('Admin collections fetched and set in store')

                    const userResponse = await fetch(`${API_URL}/users`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    const usersData = await userResponse.json()

                    if (userResponse.ok) {
                        setUsers(usersData)
                    } else {
                        console.error('Error fetching users:', error)
                    }

                    navigate('/admin-dashboard')
                } else {
                    await fetchCollectionsForUser(data.user._id)
                    console.log('User collections fetched and set in store')
                }
                navigate('/dashboard')

                console.log('Logged in successfully:', data.user)
            } else {
                setError(data.message || 'Login failed')
                console.error('Login failed:', data.message, error)
            }
        } catch (error) {
            setError('Error logging in')
            console.error('Error logging in:', error)
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center space-y-2 overflow-hidden">
            <div className="mx-8">
                <h2>Login</h2>
                <FormComponent
                    fields={loginFields}
                    buttonText="Login"
                    onSubmit={handleLogin}
                    hideCancelButton={true}
                >
                    <div className="flex justify-end">
                        <Link to="/register">
                            <p className="text-sm">Register here</p>
                        </Link>
                    </div>
                </FormComponent>
            </div>
            {/* <div className="w-[600px] h-[550px] dark:bg-foreground bg-secondary flex items-center justify-center z-10 rounded-lg">
                <h2 className='dark:text-background'>Välkommen!!</h2>
            </div> */}
        </div>
    )
}

export default LoginPage
