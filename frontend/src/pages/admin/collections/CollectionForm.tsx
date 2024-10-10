import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface CollectionFormProps {
    collection?: any
    onSubmit: () => void
}

const CollectionForm = ({ collection, onSubmit }: CollectionFormProps) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [collectionId, setCollectionId] = useState<string | null>(null)

    useEffect(() => {
        if (collection) {
            setName(collection.name)
            setCategory(collection.category)
            setCollectionId(collection._id)
            console.log(collectionId)
        } else {
            setName('')
            setCategory('')
            setCollectionId(null)
        }
    }, [collection])

    const handleSubmitCollection = async (e: React.FormEvent) => {
        e.preventDefault()

        const newCollection = { name, category }
        const updatedCollection = { name, category }

        try {
            let response
            if (collectionId) {
                response = await fetch(`http://localhost:3000/api/collections/${collectionId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedCollection),
                })
            } else {
                response = await fetch('http://localhost:3000/api/collections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCollection),
                })
                const createdCollection = await response.json()
                setCollectionId(createdCollection._id)
            }

            onSubmit()
        } catch (error) {
            console.error('Error saving collection:', error)
        }
    }

    return (
        <form
            className="flex flex-col items-start justify-center"
            onSubmit={handleSubmitCollection}
        >
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border"
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border"
                />
            </div>
            <Button type="submit">{collection ? 'Update collection' : 'Create collection'}</Button>
        </form>
    )
}

export default CollectionForm
