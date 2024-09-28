import { TableCell, TableHeader, TableRow } from "../ui/table"


interface TableHeaderProps {
    columns: string[]
}

const TableHeaderComponent: React.FC<TableHeaderProps> = ({ columns }) => {

    return (
        <TableHeader>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell key={index}>{column}</TableCell>
                ))}
            </TableRow>
        </TableHeader>
    )
}

export default TableHeaderComponent