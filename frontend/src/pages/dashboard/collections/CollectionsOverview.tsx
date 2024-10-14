import CardComponent from '@/components/CardComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'

const CollectionsOverview = () => {
    const user = useUserStore((state) => state.user)
    const [currentCollections, setCurrentCollections] = useState<Collection[]>([])
    const [completedCollections, setCompletedCollections] = useState<Collection[]>([])
    const [upcomingCollections, setUpcomingCollections] = useState<Collection[]>([])

    useEffect(() => {
        if (user && user.id) {
            fetchUserCollections(user.id)
        }
    }, [user])

    const fetchUserCollections = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${userId}/collections`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const data = await response.json()

            if (response.ok) {
                setCurrentCollections(data.currentCollections)
                setCompletedCollections(data.completedCollections)
                setUpcomingCollections(data.upcomingCollections)
            } else {
                console.error('Error fetching collections', data.message)
            }
        } catch (error) {
            console.error('Error fetching collections', error)
        }
    }

    return (
        <div className="space-y-8">
            {/* Current Collections */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentCollections.length > 0 ? (
                        currentCollections.map((collection) => (
                            <>
                                <h2>Current Collections</h2>
                                <CardComponent
                                    key={collection._id}
                                    title={collection.name}
                                    subtitle={collection.category}
                                >
                                    <Button onClick={() => console.log(`View ${collection.name}`)}>
                                        View Collection
                                    </Button>
                                </CardComponent>
                            </>
                        ))
                    ) : (
                        <p>No current collections</p>
                    )}
                </div>
            </section>

            {/* Completed Collections */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedCollections.length > 0 ? (
                        completedCollections.map((collection) => (
                            <>
                                <h2>Completed Collections</h2>

                                <CardComponent
                                    key={collection._id}
                                    title={collection.name}
                                    subtitle={collection.category}
                                >
                                    <Button
                                        onClick={() => console.log(`Review ${collection.name}`)}
                                    >
                                        Review Collection
                                    </Button>
                                </CardComponent>
                            </>
                        ))
                    ) : (
                        <p>No completed collections</p>
                    )}
                </div>
            </section>

            {/* Upcoming Collections */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingCollections.length > 0 ? (
                        upcomingCollections.map((collection) => (
                            <>
                                <h2>Upcoming Collections</h2>

                                <CardComponent
                                    key={collection._id}
                                    title={collection.name}
                                    subtitle={collection.category}
                                >
                                    <Button onClick={() => console.log(`Start ${collection.name}`)}>
                                        Start Collection
                                    </Button>
                                </CardComponent>
                            </>
                        ))
                    ) : (
                        <p>No upcoming collections</p>
                    )}
                </div>
            </section>
        </div>
    )
}

export default CollectionsOverview
