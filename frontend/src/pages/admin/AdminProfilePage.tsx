import DialogComponent from '@/components/DialogComponent'
import SettingsComponent from '@/components/SettingsComponent'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config'
import { useUserStore } from '@/store/useUserStore'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProfilePage = () => {
    const admin = useUserStore((state) => state.user)
    const updateUser = useUserStore((state) => state.updateUser)
    const clearUser = useUserStore((state) => state.clearUser)
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = async (updatedData: { [key: string]: string }) => {
        console.log('Updated user data:', updatedData)

        if (admin && updatedData.password && updatedData.password === updatedData.confirmPassword) {
            try {
                const response = await fetch(`${API_URL}/user/${admin.id}/update-password`, {
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
        } else if (admin && updatedData.name !== admin.name) {
            try {
                const response = await fetch(`${API_URL}/user/${admin.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        name: updatedData.name,
                        email: admin.email,
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
        if (admin) {
            try {
                const response = await fetch(`${API_URL}/user/${admin.id}`, {
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

    if (!admin) {
        return <div>Loading...</div>
    }

    return (
        <div className="h-[500px] flex flex-col items-center justify-center border-4 border-accent p-6 rounded-md shadow-md">
            <div className='flex justify-center'>
                <SettingsComponent
                    user={admin}
                    buttonText="Update profile"
                    handleSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                    isEditing={isEditing}
                />
            </div>

            <div className="flex space-x-3 place-self-end mt-2">
                {!isEditing && (
                    <Button
                        className="px-10"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}

                {!isEditing && (
                <DialogComponent
                    title="Delete account"
                    description="Are you sure you want to delete you account?"
                    triggerText={<Trash2 size={16} />}
                    onConfirm={handleDeleteAccount}
                    confirmText="Yes, delete"
                    cancelText="Cancel"
                    isDeleteConfirmation={true}
                />
                )}
            </div>
        </div>
    )
}

export default AdminProfilePage
