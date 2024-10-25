import CardComponent from '@/components/CardComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { useCollectionsStore } from '@/store/useCollectionsStore'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CollectionsOverview = () => {
    const user = useUserStore((state) => state.user)
    const fetchCollectionsForUser = useCollectionsStore((state) => state.fetchCollectionsForUser)
    const collections = useCollectionsStore((state) => state.collections)
    console.log('Collections in CollectionsOverview:', collections)
    const hasFetchedCollections = useCollectionsStore((state) => state.hasFetchedCollections)
    const navigate = useNavigate()

    useEffect(() => {
        if (!hasFetchedCollections && user?._id) {
            fetchCollectionsForUser(user._id)
        }
    }, [hasFetchedCollections, user, fetchCollectionsForUser])

    const handleViewCollection = (collectionId: string) => {
        navigate(`/dashboard/collections/${collectionId}`)
    }

    const collectionSections = {
        currentCollections: {
            title: 'Current Collections',
            buttonText: 'View Collection',
            collections: collections.currentCollections || [],
            action: (collection: Collection) => handleViewCollection(collection._id),
        },
        completedCollections: {
            title: 'Completed Collections',
            buttonText: 'Review Collection',
            collections: collections.completedCollections || [],
            action: (collection: Collection) => handleViewCollection(collection._id),
        },
        upcomingCollections: {
            title: 'Upcoming Collections',
            buttonText: 'Start Collection',
            collections: collections.upcomingCollections || [],
            action: (collection: Collection) => handleViewCollection(collection._id),
        },
    }

    return (
        <div className="space-y-8 flex flex-col">
            {Object.keys(collectionSections).map((sectionKey) => {
                const section = collectionSections[sectionKey as keyof typeof collectionSections]
                return (
                    <section key={sectionKey}>
                        <h2>{section.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {section.collections.length > 0 ? (
                                section.collections.map((collection) => (
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
