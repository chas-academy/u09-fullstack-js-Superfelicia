import { useState, useEffect } from 'react'
import CollectionList from './CollectionList'
import { Collection } from '@/interfaces/Collection'
import FlashcardForm from '../flashcards/FlashcardForm'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { API_URL } from '@/config'
import DialogComponent from '@/components/DialogComponent'
import CollectionForm from './CollectionForm'

const CollectionPage = () => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        fetchCollections()
    }, [])

    const fetchCollections = async () => {
        try {
            const response = await fetch(`${API_URL}/collections`)
            const data = await response.json()
            setCollections(data)
        } catch (error) {
            console.error('Error fetching collections:', error)
        }
    }

    const handleSubmitCollection = async (formData: Partial<Collection>, collectionId?: string) => {
        if (!formData.name || !formData.category) {
            alert('Name and category are required fields.')
            return
        }

        const newCollection = {
            ...formData,
            flashcards: formData.flashcards || [],
            infoText: formData.infoText || '',
            deadline: formData.deadline || '',
        }

        try {
            const response = collectionId
                ? await fetch(`${API_URL}/collections/${collectionId}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newCollection),
                  })
                : await fetch(`${API_URL}/collections`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newCollection),
                  })

            const savedCollection = await response.json()

            if (!response.ok) {
                throw new Error(savedCollection.message || 'Failed to save collection')
            }

            fetchCollections()

            if (!collectionId) {
                setSelectedCollection(null)
            }
        } catch (error) {
            console.error('Error saving collection:', error)
        }
    }

    const handleEditCollection = async (collection: Collection) => {
        setSelectedCollection(collection)
    }

    const handleCreateCollection = (newCollection: Collection) => {
        setCollections((prevCollections) => [...prevCollections, newCollection])
    }

    const handleFormSubmit = (stayOnCollection = false) => {
        fetchCollections()
        if (!stayOnCollection) {
            setSelectedCollection(null)
        }
    }

    return (
        <div className="w-full flex flex-col space-y-10 items-center justify-center px-5">
            <DialogComponent
                title="Create new collection"
                triggerText="Create new collection"
                onConfirm={() => handleCreateCollection}
                confirmText={'Create collection'}
            >
                <CollectionForm onSubmit={handleSubmitCollection} />
            </DialogComponent>
            {!selectedCollection ? (
                <CollectionList
                    collections={collections}
                    onSelectCollection={setSelectedCollection}
                    onDeleteCollection={(collectionId) => {
                        setCollections(collections.filter((col) => col._id !== collectionId))
                    }}
                    onEditCollection={handleEditCollection}
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
