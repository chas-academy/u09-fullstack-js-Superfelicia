import CardComponent from '@/components/CardComponent'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/config'
import { Collection } from '@/interfaces/Collection'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CollectionsOverview = () => {
    const user = useUserStore((state) => state.user)
    const [collectionsData, setCollectionsData] = useState({
        currentCollections: [] as Collection[],
        completedCollections: [] as Collection[],
        upcomingCollections: [] as Collection[],
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.id) {
            fetchUserCollections(user.id)
        }
    }, [user])

    const fetchUserCollections = async (userId: string) => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}/collections`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (response.ok) {
                setCollectionsData({
                    currentCollections: data.currentCollections,
                    completedCollections: data.completedCollections,
                    upcomingCollections: data.upcomingCollections,
                })
            } else {
                console.error('Error fetching collections', data.message)
            }
        } catch (error) {
            console.error('Error fetching collections', error)
        }
    }

    const handleViewCollection = (collectionId: string) => {
        navigate(`/dashboard/collections/${collectionId}`)
    }

    const collectionSections = {
        currentCollections: {
            title: 'Current Collections',
            buttonText: 'View Collection',
            action: (collection: Collection) => handleViewCollection(collection._id),
        },
        completedCollections: {
            title: 'Completed Collections',
            buttonText: 'Review Collection',
            action: (collection: Collection) => console.log(`Review ${collection.name}`),
        },
        upcomingCollections: {
            title: 'Upcoming Collections',
            buttonText: 'Start Collection',
            action: (collection: Collection) => console.log(`Start ${collection.name}`),
        },
    }

    return (
        <div className="space-y-8 flex flex-col">
            {Object.keys(collectionSections).map((sectionKey) => {
                const section = collectionSections[sectionKey as keyof typeof collectionSections]
                const collections = collectionsData[sectionKey as keyof typeof collectionsData]
                return (
                    <section key={sectionKey}>
                        <h2>{section.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {collections.length > 0 ? (
                                collections.map((collection) => (
                                    <>
                                        <CardComponent
                                            key={collection._id}
                                            title={collection.name}
                                            subtitle={collection.category}
                                            onClick={() => handleViewCollection(collection._id)}
                                        >
                                            <Button
                                                onClick={() =>
                                                    console.log(
                                                        `View ${collection.name}` &&
                                                            handleViewCollection(collection._id)
                                                    )
                                                }
                                            >
                                                View Collection
                                            </Button>
                                        </CardComponent>
                                    </>
                                ))
                            ) : (
                                <p>No {section.title.toLowerCase()}</p>
                            )}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default CollectionsOverview
