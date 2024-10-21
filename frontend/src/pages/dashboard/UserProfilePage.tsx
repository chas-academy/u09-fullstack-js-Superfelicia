import DialogComponent from '@/components/DialogComponent'
import SettingsComponent from '@/components/SettingsComponent'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config'
import { useUserStore } from '@/store/useUserStore'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProfilePage = () => {
    const user = useUserStore((state) => state.user)
    const updateUser = useUserStore((state) => state.updateUser)
    const clearUser = useUserStore((state) => state.clearUser)
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)


    const handleSubmit = async (updatedData: { [key: string]: string }) => {
        console.log('Updated user data:', updatedData)

        if (user && updatedData.password && updatedData.password === updatedData.confirmPassword) {
            try {
                const response = await fetch(`${API_URL}/user/${user.id}/update-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        currentPassword: updatedData.currentPassword,
                        newPassword: updatedData.password,
                    }),
                })

                const data = await response.json()

                if (response.ok) {
                    console.log('Password updated successfully:', data)
                    // lägg till alert
                } else {
                    console.error('Error updating password:', data.message)
                    // lägg till error alert
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else if (user && updatedData.name !== user.name) {
            try {
                const response = await fetch(`${API_URL}/user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        name: updatedData.name,
                        email: user.email,
                    }),
                })

                const data = await response.json()
                console.log(data)

                if (response.ok) {
                    console.log('Name updated successfully!')
                    updateUser({ name: updatedData.name })
                    // lägg till alert, ruta eller något
                } else {
                    console.log('Error updating name')
                    // lägg till alert, ruta
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
    }
 
    const handleDeleteAccount = async () => {
        if (user) {
            try {
                const response = await fetch(`${API_URL}/user/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const data = await response.json()
                console.log(data)

                if (response.ok) {
                    alert('Account delete successfully!')
                    clearUser()
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    alert('Error deleting account')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className='flex flex-col'>
            <h1>User profile</h1>
            <SettingsComponent
                user={user}
                buttonText="Update profile"
                handleSubmit={handleSubmit}
                onCancel={handleCancelEdit}
                isEditing={isEditing}
            />

            {!isEditing && (
                <Button className='w-full border rounded-md p-6' onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
            )}

            <div className="flex">
                <DialogComponent
                    title="Delete account"
                    description="Are you sure you want to delete you account?"
                    triggerText={<Trash2 size={16} />}
                    onConfirm={handleDeleteAccount}
                    confirmText="Yes, delete"
                    cancelText="Cancel"
                    isDeleteConfirmation={true}
                />
            </div>
        </div>
    )
}

export default UserProfilePage
