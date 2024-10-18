import { useState } from 'react'
import FormComponent from './formComponent.tsx'
import { useUserStore } from '../store/useUserStore.ts'

interface CreateUserProps {
    buttonText: string
    onSubmit: (formData: { [key: string]: string }) => void
    closeDialog: () => void
}

const CreateUserComponent = ({ buttonText, onSubmit, closeDialog }: CreateUserProps) => {
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

    const handleSubmit = (formData: { [key: string]: string }) => {
        onSubmit({ ...formData, roles: isAdmin ? 'admin' : 'user' })
        closeDialog()
    }

    return (
        <div className="flex flex-col items-start space-y-2">
            <FormComponent fields={registerFields} buttonText={buttonText} onSubmit={handleSubmit}>
                {' '}
                {user?.roles.includes('admin') && (
                    <div className="space-x-4">
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                        <label>Admin</label>
                    </div>
                )}
            </FormComponent>
        </div>
    )
}

export default CreateUserComponent
