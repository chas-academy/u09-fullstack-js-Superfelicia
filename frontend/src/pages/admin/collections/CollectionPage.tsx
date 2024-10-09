import { useState, useEffect } from 'react'
import CollectionForm from './CollectionForm'
import CollectionList from './CollectionList'
import { Collection } from '@/interfaces/Collection'

const CollectionPage = () => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const [collections, setCollections] = useState<Collection[]>([])

    // Hämta samlingar från backend när sidan laddas
    useEffect(() => {
        fetchCollections()
    }, [])

    const fetchCollections = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/collections')
            const data = await response.json()
            setCollections(data)
        } catch (error) {
            console.error('Error fetching collections:', error)
        }
    }

    const handleEditCollection = (collection: Collection) => {
        console.log(collection._id)
        setSelectedCollection(collection)
    }

    const handleFormSubmit = () => {
        fetchCollections() // Uppdatera listan med samlingar när en ny skapas eller redigeras
        setSelectedCollection(null) // Återställ formuläret efter inlämning
    }

    return (
        <div className="flex flex-col space-y-10 items-start">
            <CollectionList collections={collections} onEdit={handleEditCollection} />
            <CollectionForm collection={selectedCollection} onSubmit={handleFormSubmit} />
        </div>
    )
}

export default CollectionPage
