import { useState } from 'react'
import { Button } from './ui/button'
import { Search, Undo2 } from 'lucide-react'

interface SearchComponentProps {
    onSearch: (searchTerm: string) => void
    placeholder?: string
}

const SearchComponent: React.FC<SearchComponentProps> = ({
    onSearch,
    placeholder = 'Search...',
}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        console.log(searchTerm)
    }

    const handleSearchClick = () => {
        onSearch(searchTerm)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
        onSearch('')
    }

    return (
        <div className='flex items-center space-x-2'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="max-w-96 border rounded"
            />
            <Button onClick={handleSearchClick} className="rounded">
                <Search size={18} />
            </Button>
            <Button onClick={handleClearSearch} className="rounded">
                <Undo2 size={18}/>
            </Button>
        </div>
    )
}

export default SearchComponent
