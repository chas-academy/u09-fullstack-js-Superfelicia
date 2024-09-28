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
        <TableRow>
            {columns.map((column, index) => (
                <TableCell key={index}>{rowData[column] || 'N/A'}</TableCell>
            ))}
            <TableCell>
                <Actions rowData={rowData} onEdit={onEdit} onDelete={onDelete} />
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent
