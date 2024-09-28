import columns from './Columns'
import { Table, TableBody } from '../ui/table'
import TableRowComponent from './TableRowComponent'
import TableHeaderComponent from './TableHeaderComponent'
import { User } from '@/pages/admin/adminDashboardPage'

interface TableComponentProps {
    data: User[]
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

const TableComponent: React.FC<TableComponentProps> = ({ data, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHeaderComponent columns={columns} />
            <TableBody>
                {data.map((rowData, index) => (
                    <TableRowComponent
                        key={index}
                        rowData={rowData}
                        columns={columns}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

export default TableComponent
