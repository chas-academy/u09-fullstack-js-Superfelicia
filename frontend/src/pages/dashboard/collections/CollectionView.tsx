import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CollectionView = () => {
    const { collectionId } = useParams()
    const [collection, setCollection] = useState(null)

    useEffect(() => {
        const fetchCollection = async () => {
            const response = await fetch(`http://localhost:3000/api/collections/${collectionId}`)
            const data = await response.json()
            setCollection(data)
        }

        fetchCollection()
    }, [collectionId])

    if (!collection) return <p>Loading...</p>

    return (
        <div>
            <h1>{collection.title}</h1>
            <p>Status: {collection.status}</p>
            <p>Progress: {collection.progress}%</p>
            <p>Deadline: {new Date(collection.deadline).toLocaleDateString()}</p>

            <Button onClick={() => console.log('Start collection')}>Start collection</Button>
        </div>
    )
}

export default CollectionView
