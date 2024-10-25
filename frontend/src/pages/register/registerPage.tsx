import { API_URL } from '@/config'
import CreateUserComponent from '../../components/createUserComponent'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const navigate = useNavigate()

    const handleUserCreated = async (
        newUser: any,
        formData: { email: string; password: string }
    ) => {
        const { email, password } = formData

        setSuccessMessage(`User ${newUser.name} registered successfully!`)
        setIsLoggingIn(true)

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)

                setTimeout(() => {
                    navigate('/dashboard')
                }, 1500)
            } else {
                setSuccessMessage(null)
                setIsLoggingIn(false)
                console.error('Login failed', data.message)
            }
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <h2>Register</h2>

            {!isLoggingIn && (
                <CreateUserComponent
                    buttonText="Register"
                    apiEndpoint={`${API_URL}/auth/user`}
                    onSubmit={handleUserCreated}
                    hideCancelButton={true}
                />
            )}

            {successMessage && (
                <div>
                    <p className="text-green-500">{successMessage}</p>
                </div>
            )}

            {isLoggingIn && (
                <div className="flex justify-center items-center bg-foreground border p-4 rounded-md">
                    <p className="text-blue-500">Logging you in...</p>
                </div>
            )}
        </div>
    )
}

export default RegisterPage
