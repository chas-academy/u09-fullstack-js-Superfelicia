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
        <div className='w-[530px] flex items-center space-x-2'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-96 border p-2 rounded"
            />
            <Button onClick={handleSearchClick} className="rounded p-2">
                <Search size={18} />
            </Button>
            <Button onClick={handleClearSearch} className="rounded p-2">
                <Undo2 size={18}/>
            </Button>
        </div>
    )
}

export default SearchComponent
