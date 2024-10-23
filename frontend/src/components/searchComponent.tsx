import { useState } from 'react'
import { Button } from './ui/button'
import { Search, Undo2 } from 'lucide-react'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface SearchComponentProps {
    onSearch: (searchTerm: string, role: string) => void
    placeholder?: string
}

const SearchComponent: React.FC<SearchComponentProps> = ({
    onSearch,
    placeholder = 'Search...',
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedRole, setSelectedRole] = useState('all')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    }

    const handleRoleChange = (value: string) => {
        setSelectedRole(value)
    }

    const handleSearchClick = () => {
        onSearch(searchTerm, selectedRole)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
        setSelectedRole('all')
        onSearch('', 'all')
    }

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="max-w-96 border rounded"
            />
            <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger className='w-40'>
                    <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleSearchClick} className="rounded btn-primary">
                <Search size={18} />
            </Button>
            <Button onClick={handleClearSearch} className="rounded">
                <Undo2 size={18} />
            </Button>
        </div>
    )
}

export default SearchComponent
