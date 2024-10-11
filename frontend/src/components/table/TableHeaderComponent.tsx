import { TableCell, TableHeader, TableRow } from "../ui/table"


interface TableHeaderProps {
    columns: string[]
}

const TableHeaderComponent: React.FC<TableHeaderProps> = ({ columns }) => {

    return (
        <TableHeader className="">
            <TableRow className="text-muted-foreground uppercase text-xs text-start">
                {columns.map((column, index) => (
                    <TableCell className={`${index === 0 ? '' : 'hidden sm:table-cell'}`} key={index}>{column}</TableCell>
                ))}
                <TableCell className="text-end pr-8">actions</TableCell>
            </TableRow>
        </TableHeader>
    )
}

export default TableHeaderComponent