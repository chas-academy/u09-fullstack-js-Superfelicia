import { useState } from 'react'
import FormComponent from './formComponent.tsx'
import { useUserStore } from '../store/useUserStore.ts'

interface CreateUserProps {
    onSuccess?: () => void
    buttonText: string
}

const CreateUserComponent = ({ onSuccess, buttonText }: CreateUserProps) => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const user = useUserStore((state) => state.user)

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

    const handleCreate = async (formData: { [key: string]: string }) => {
        const { name, email, password, confirmPassword } = formData

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, roles: isAdmin ? 'admin' : 'user' }),
            })

            const data = await response.json()
            console.log(data)

            if (response.ok) {
                setSuccess('User registered successfully!')
                setError(null)
                if (onSuccess) onSuccess()
            } else {
                setError(data.message || 'Error registering user')
            }
        } catch (error) {
            setError('Error registering user')
        }
    }

    return (
        <div className="flex flex-col items-start space-y-2">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <FormComponent
                fields={registerFields}
                buttonText={buttonText}
                onSubmit={handleCreate}
            />

            {user?.roles.includes('admin') && (
                <div>
                    <label>
                        <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={() => {console.log('pressed'); setIsAdmin(!isAdmin)}}
                        />
                        Admin or not admin
                    </label>
                </div>
            )}

        </div>
    )
}

export default CreateUserComponent
