import { useState, useEffect } from 'react'
import CollectionList from './CollectionList'
import { Collection } from '@/interfaces/Collection'
import FlashcardForm from '../flashcards/FlashcardForm'
import { Button } from '@/components/ui/button'
import { CircleArrowLeft } from 'lucide-react'
import { API_URL } from '@/config'
import DialogComponent from '@/components/DialogComponent'
import CollectionForm from './CollectionForm'
import { useCollectionsStore } from '@/store/useCollectionsStore'

const CollectionPage = () => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const fetchCollectionsForAdmin = useCollectionsStore((state) => state.fetchCollectionsForAdmin)
    const collectionsStore = useCollectionsStore((state) => state.collections) || []
    const hasFetchedCollections = useCollectionsStore((state) => state.hasFetchedCollections)
    // const [collections, setCollections] = useState<Collection[]>([])

    const allCollections = [
        ...collectionsStore.currentCollections || [],
        ...collectionsStore.completedCollections || [],
        ...collectionsStore.upcomingCollections || [],
    ]

    useEffect(() => {
        if (!hasFetchedCollections) {
            fetchCollectionsForAdmin()
        }
    }, [hasFetchedCollections, fetchCollectionsForAdmin])

    const handleDeleteCollection = async (collectionId: string) => {
        try {
            const response = await fetch(`${API_URL}/collections/${collectionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete collection')
            }

            fetchCollectionsForAdmin()
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
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                      body: JSON.stringify(newCollection),
                  })
                : await fetch(`${API_URL}/collections`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                      body: JSON.stringify(newCollection),
                  })

            const savedCollection = await response.json()

            if (!response.ok) {
                throw new Error(savedCollection.message || 'Failed to save collection')
            }

            fetchCollectionsForAdmin()
            setSelectedCollection(null)
        } catch (error) {
            console.error('Error saving collection:', error)
        }
    }

    const handleEditCollection = async (collection: Collection) => {
        setSelectedCollection(collection)
    }

    const handleCreateCollection = async () => {
        await fetchCollectionsForAdmin()
    }

    const handleFormSubmit = async (stayOnCollection = false) => {
        await fetchCollectionsForAdmin()
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
                    collections={allCollections}
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
