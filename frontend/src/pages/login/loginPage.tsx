import FormComponent from '../../components/formComponent'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { useState } from 'react'

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
            const response = await fetch('http://localhost:3000/api/auth/login', {
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
        <div className="w-full flex flex-col items-center justify-center space-y-2">
            <h2>Login</h2>
            <FormComponent fields={loginFields} buttonText="Login" onSubmit={handleLogin} />
        </div>
    )
}

export default LoginPage
