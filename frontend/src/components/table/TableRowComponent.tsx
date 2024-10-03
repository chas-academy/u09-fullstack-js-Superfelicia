import { User } from '@/pages/admin/adminDashboardPage'
import Actions from './Actions'
import { TableCell, TableRow } from '../ui/table'

interface TableRowProps {
    rowData: User
    columns: string[]
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

const TableRowComponent: React.FC<TableRowProps> = ({ rowData, columns, onEdit, onDelete }) => {

    return (
        <TableRow className='hover:bg-gray-100 border-b transition duration-300 ease-in-out'>
            {columns.map((column, index) => (
                <TableCell className='px-6 py-4 text-sm text-gray-900' key={index}>{rowData[column] || 'N/A'}</TableCell>
            ))}
            <TableCell>
                <Actions rowData={rowData} onEdit={onEdit} onDelete={onDelete} />
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent
