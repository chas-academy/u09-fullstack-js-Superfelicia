import { useState } from 'react'

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
        <>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="border p-2 rounded"
            />
            <button onClick={handleSearchClick} className="rounded p-2">
                Search
            </button>
            <button onClick={handleClearSearch} className="rounded p-2">
                Clear
            </button>
        </>
    )
}

export default SearchComponent
