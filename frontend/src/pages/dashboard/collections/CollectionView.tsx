import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CollectionView = () => {
    const { collectionId } = useParams()
    const [collection, setCollection] = useState<Collection | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCollection = async () => {
            const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`)
            const data: Collection = await response.json()
            if (!data.flashcards || data.flashcards.length === 0) {
                console.error('No flashcards found')
            }
            setCollection(data)
            console.log(collection)
        }

        fetchCollection()
    }, [collectionId])

    const handleStartCollection = () => {
        navigate(`/dashboard/collections/${collectionId}/start`)
    }

    if (!collection) return <p>Loading...</p>

    return (
        <div>
            <h1>{collection.name}</h1>
            <p>Status: {collection.status}</p>
            <p>Progress: {collection.progress}%</p>
            <p>Deadline: {new Date(collection.deadline).toLocaleDateString()}</p>

            <Button onClick={handleStartCollection}>Start collection</Button>
        </div>
    )
}

export default CollectionView
