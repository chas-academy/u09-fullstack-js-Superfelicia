import { Button } from '@/components/ui/button'
import { API_URL } from '@/config'
import { Collection } from '@/interfaces/Collection'
import { CircleArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CollectionView = () => {
    const { collectionId } = useParams()
    const [collection, setCollection] = useState<Collection | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCollection = async () => {
            const response = await fetch(`${API_URL}/collections/${collectionId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })
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
        <div className="h-[300px] flex flex-col justify-center border rounded-md shadow-md p-8">
            <div className='flex flex-col space-y-2 p-2'>
                <h1>{collection.name}</h1>
                <p>Status: {collection.status}</p>
                <p>Progress: {collection.progress}%</p>
                <p>Deadline: {new Date(collection.deadline).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleStartCollection}>Start collection</Button>
                <Button
                    type="button"
                    onClick={() => navigate('/dashboard/collections-overview')}
                    className="gap-2"
                >
                    <CircleArrowLeft size={16} />
                    Back to collections
                </Button>
            </div>
        </div>
    )
}

export default CollectionView
