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
        <TableRow className='border-b transition duration-300 ease-in-out text-start'>
            {columns.map((column, index) => (
                <TableCell className={`${index === 0 ? '' : 'hidden sm:table-cell'}`} key={index}>{rowData[column] || 'N/A'}</TableCell>
            ))}
            <TableCell>
                <Actions rowData={rowData} onEdit={onEdit} onDelete={onDelete} />
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent
