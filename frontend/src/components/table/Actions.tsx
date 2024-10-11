import { User } from '@/pages/admin/adminDashboardPage'
import DialogComponent from '../DialogComponent'
import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface ActionsProps {
    rowData: User
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

const Actions: React.FC<ActionsProps> = ({ rowData, onEdit, onDelete }) => {
    const [updatedUserData, setUpdatedUserData] = useState(rowData)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        setUpdatedUserData({ ...updatedUserData, [field]: e.target.value })
    }

    const handleSave = () => {
        onEdit(updatedUserData)
    }

    const handleDelete = () => {
        console.log('Deleting:', rowData)
        onDelete(rowData._id)
    }

    return (
        <>
            <div className="block sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleSave}>
                            <Pencil size={14} className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className='text-destructive'>
                            <Trash2 size={14} className='mr-2'/> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="hidden sm:flex space-x-2 justify-end">
                <DialogComponent
                    title="Edit user"
                    description="Update user details"
                    triggerText={<Pencil size={14} />}
                    onConfirm={handleSave}
                    isDeleteConfirmation={false}
                >
                    <input
                        type="text"
                        value={updatedUserData.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={updatedUserData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        placeholder="Email"
                    />
                    <select
                        value={updatedUserData.roles[0]}
                        onChange={(e) => handleInputChange(e, 'roles')}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </DialogComponent>

                <DialogComponent
                    title="Delete user"
                    description={`Are your sure you want to delete ${rowData.name}?`}
                    triggerText={<Trash2 size={14} />}
                    onConfirm={handleDelete}
                    isDeleteConfirmation={true}
                />
            </div>
        </>
    )
}

export default Actions
