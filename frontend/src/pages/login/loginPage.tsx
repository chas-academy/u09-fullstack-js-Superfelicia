import FormComponent from '../../components/formComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { useState } from 'react'
import { API_URL } from '@/config'

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null)
    const setUser = useUserStore((state) => state.setUser)
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
                    navigate('/admin-dashboard')
                } else {
                    navigate('/dashboard')
                }

                console.log('Logged in successfully:', data.user)
                // Redirect eller uppdatera state för inloggning
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
        <div className="w-full flex items-center justify-evenly space-y-2 overflow-hidden">
            <div className="mx-8">
                <h2>Login</h2>
                <FormComponent fields={loginFields} buttonText="Login" onSubmit={handleLogin} hideCancelButton={true}>
                    <div className='flex justify-end'>
                        <Link to="/register">
                            <p className="text-sm">Register here</p>
                        </Link>
                    </div>
                </FormComponent>
            </div>
            <div className="w-[600px] h-[550px] bg-gray-200 flex items-center justify-center z-10 rounded-lg">
                <h2>Välkommen!!</h2>
            </div>
        </div>
    )
}

export default LoginPage
