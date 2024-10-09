import { useState, useEffect } from 'react'
import CollectionList from './CollectionList'
import { Collection } from '@/interfaces/Collection'
import FlashcardForm from '../flashcards/FlashcardForm'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'

const CollectionPage = () => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const [collections, setCollections] = useState<Collection[]>([])

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
        fetchCollections()
        setSelectedCollection(null)
    }

    return (
        <div className="flex flex-col space-y-10 items-start">
            {!selectedCollection ? (
                <CollectionList
                    collections={collections}
                    onSelectCollection={handleEditCollection}
                />
            ) : (
                <>
                    <FlashcardForm collection={selectedCollection} onSubmit={handleFormSubmit} />
                    <Button
                        type="button"
                        onClick={() => setSelectedCollection(null)}
                        className="gap-2"
                    >
                        <CircleArrowLeft size={16} />
                        Back to collections
                    </Button>
                </>
            )}
        </div>
    )
}

export default CollectionPage
