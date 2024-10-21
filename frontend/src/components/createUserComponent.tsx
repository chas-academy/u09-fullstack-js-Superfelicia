import { useState } from 'react'
import FormComponent from './formComponent.tsx'
import { useUserStore } from '../store/useUserStore.ts'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'

interface CreateUserProps {
    buttonText: string
    onSubmit?: (newUser: any) => void
    apiEndpoint: string
    closeDialog?: () => void
}

const CreateUserComponent = ({
    buttonText,
    onSubmit,
    apiEndpoint,
    closeDialog,
}: CreateUserProps) => {
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

    const handleSubmit = async (formData: { [key: string]: string }) => {
        const { name, email, password, confirmPassword } = formData

        if (password !== confirmPassword) {
            console.log('Passwords do not match')
            return
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, roles: isAdmin ? 'admin' : 'user' }),
            })

            const data = await response.json()

            if (response.ok) {
                if (onSubmit) onSubmit(data)
                if (closeDialog) closeDialog()
            } else {
                console.log(data.message || 'Error registering user')
            }
        } catch (error) {
            console.error('Error registering user', error)
        }
    }

    return (
        <div className="flex flex-col items-start space-y-2">
            <FormComponent fields={registerFields} buttonText={buttonText} onSubmit={handleSubmit}>
                {user?.roles.includes('admin') && (
                    <>
                        <Label className='flex items-center'>
                            Admin
                            <Input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                                className='ml-2'
                            />
                        </Label>
                    </>
                )}
            </FormComponent>
        </div>
    )
}

export default CreateUserComponent
