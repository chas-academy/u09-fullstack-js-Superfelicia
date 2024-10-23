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

    const handleDeleteCollection = async (collectionId: string) => {
        try {
            const response = await fetch(`${API_URL}/collections/${collectionId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete collection')
            }

            setCollections((prevCollections) =>
                prevCollections.filter((collection) => collection._id !== collectionId)
            )
        } catch (error) {
            console.error('Error deleting collection:', error)
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
        <div className="w-full h-full flex flex-col items-center justify-center px-5 space-x-2 space-y-3">
            <DialogComponent
                title="Create new collection"
                triggerText="Create new collection"
                onConfirm={() => handleCreateCollection}
                showActions={false}
                className="place-self-end"
            >
                {({ closeDialog }) => (
                    <CollectionForm onSubmit={handleSubmitCollection} onCancel={closeDialog} />
                )}
            </DialogComponent>
            {!selectedCollection ? (
                <CollectionList
                    collections={collections}
                    onSelectCollection={setSelectedCollection}
                    onDeleteCollection={handleDeleteCollection}
                    onEditCollection={handleEditCollection}
                />
            ) : (
                <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex justify-end">
                        <FlashcardForm
                            collection={selectedCollection}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                    <div className="place-self-end">
                        <Button
                            type="button"
                            onClick={() => setSelectedCollection(null)}
                            className="w-56 gap-2"
                        >
                            <CircleArrowLeft size={16} />
                            Back to collections
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CollectionPage
