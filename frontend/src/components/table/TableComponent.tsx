import columns from './Columns'
import { Table, TableBody } from '../ui/table'
import TableRowComponent from './TableRowComponent'
import TableHeaderComponent from './TableHeaderComponent'
import { User } from '@/pages/admin/adminDashboardPage'

interface TableComponentProps {
    data: User[]
    // onEdit: (user: User) => void
    // onDelete: (userId: string) => void
    renderActions: (user: User) => React.ReactNode
}

const TableComponent: React.FC<TableComponentProps> = ({ data, renderActions }) => {
    return (
        <div className="overflow-y-auto">
            <Table className="w-full border table-fixed">
                <TableHeaderComponent columns={columns} />
                <TableBody>
                    {data.map((rowData, index) => (
                        <TableRowComponent
                            key={index}
                            rowData={rowData}
                            columns={columns}
                            renderActions={() => renderActions(rowData)}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TableComponent
