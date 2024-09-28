import { User } from "@/pages/admin/adminDashboardPage"

interface ActionsProps {
    rowData: User
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

const Actions: React.FC<ActionsProps> = ({ rowData, onEdit, onDelete }) => {
    const handleEdit = () => {
        console.log('Editing:', rowData)
        onEdit(rowData)
    }

    const handleDelete = () => {
        console.log('Deleting:', rowData)
        if (window.confirm('Are you sure you want to delete this user?')) {
            onDelete(rowData._id)
        }
    }

    return (
        <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Actions
