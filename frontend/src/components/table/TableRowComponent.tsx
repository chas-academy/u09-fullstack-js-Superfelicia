import { User } from '@/interfaces/User'
import { TableCell, TableRow } from '../ui/table'

interface TableRowProps {
    rowData: User
    columns: string[]
    renderActions: (user: User) => React.ReactNode
}

const TableRowComponent: React.FC<TableRowProps> = ({ rowData, columns, renderActions }) => {

    return (
        <TableRow className='border-b transition duration-300 ease-in-out text-start'>
            {columns.map((column, index) => (
                <TableCell className={`${index === 0 ? '' : 'hidden sm:table-cell'}`} key={index}>{rowData[column] || 'N/A'}</TableCell>
            ))}
            <TableCell>
                {renderActions(rowData)}
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent
