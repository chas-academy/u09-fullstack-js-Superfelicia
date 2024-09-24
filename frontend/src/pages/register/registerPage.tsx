import { useState } from 'react'
import FormComponent from '../../components/formComponent'

const RegisterPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const registerFields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            name: 'name',
        },
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
        {
            label: 'Confirm password',
            type: 'password',
            placeholder: 'Confirm password',
            name: 'confirmPassword',
        },
    ]

    const handleRegister = async (formData: { [key: string]: string }) => {
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, roles: 'user' })
            })

            const data = await response.json()
            console.log(data)

            if (response.ok) {
                setSuccess('User registered successfully!')
                setError(null)
            } else {
                setError(data.message || 'Error registering user');
            }
        } catch (error) {
            setError('Error registering user')
        }
    }

    return (
        <div className='flex flex-col items-start space-y-2'>
            <h2>Register</h2>

            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}

            <FormComponent
                fields={registerFields}
                buttonText="Register"
                onSubmit={handleRegister}
            />
        </div>
    )
}

export default RegisterPage
