import { useState } from 'react'
import FormComponent from './formComponent'

interface SettingsComponentProps {
    buttonText: string
    user: {
        name: string
        email: string
        password?: string
        roles?: string[]
    }
    handleSubmit: (updatedData: { [key: string]: string }) => void
    onCancel?: () => void
    isEditing?: boolean
    isAdmin?: boolean
}

const SettingsComponent = ({
    buttonText,
    user,
    handleSubmit,
    isAdmin,
    onCancel,
    isEditing = false,
}: SettingsComponentProps) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        currentPassword: '',
        password: '',
        confirmPassword: '',
    })

    const [passwordError, setPasswordError] = useState<string | null>(null)

    const registerFields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            name: 'name',
            value: formData.name,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, name: e.target.value })),
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            name: 'email',
            value: formData.email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, email: e.target.value })),
        },
        {
            label: 'Current Password',
            type: 'password',
            placeholder: 'Enter current password',
            name: 'currentPassword',
            value: formData.currentPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, currentPassword: e.target.value })),
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
            value: formData.password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }))
                if (formData.confirmPassword && e.target.value !== formData.confirmPassword) {
                    setPasswordError('Passwords do not match')
                } else {
                    setPasswordError(null)
                }
            },
        },
        {
            label: 'Confirm password',
            type: 'password',
            placeholder: 'Confirm password',
            name: 'confirmPassword',
            value: formData.confirmPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                if (formData.password && e.target.value !== formData.password) {
                    setPasswordError('Passwords do not match')
                } else {
                    setPasswordError(null)
                }
            },
        },
    ]

    if (isAdmin) {
        registerFields.push({
            label: 'Roles',
            type: 'text',
            placeholder: 'Roles',
            name: 'roles',
            value: user.roles?.join(', ') || '',
            onChange: () => {},
        })
    }

    const handleFormSubmit = () => {
        if (passwordError) {
            console.log('Passwords do not match')
            return
        }
        handleSubmit(formData)
    }

    return (
        <div className="flex flex-col items-start">
            <FormComponent
                fields={registerFields}
                buttonText={buttonText}
                onSubmit={handleFormSubmit}
                isEditing={isEditing}
                onCancel={onCancel}
            />
            {/* {passwordError && <p className="text-red-500">{passwordError}</p>} */}
        </div>
    )
}

export default SettingsComponent
