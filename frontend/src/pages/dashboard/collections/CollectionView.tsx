import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CollectionView = () => {
    const { collectionId } = useParams()
    const [collection, setCollection] = useState<Collection | null>(null)

    useEffect(() => {
        const fetchCollection = async () => {
            const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`)
            const data: Collection = await response.json()
            setCollection(data)
            console.log(collection)
        }

        fetchCollection()
    }, [collectionId])

    if (!collection) return <p>Loading...</p>

    return (
        <div>
            <h1>{collection.name}</h1>
            <p>Status: {collection.status}</p>
            <p>Progress: {collection.progress}%</p>
            <p>Deadline: {new Date(collection.deadline).toLocaleDateString()}</p>

            <Button onClick={() => console.log('Start collection')}>Start collection</Button>
        </div>
    )
}

export default CollectionView
