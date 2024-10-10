import CardComponent from '@/components/CardComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'

interface CollectionListProps {
    collections: Collection[]
    onSelectCollection: (collection: Collection) => void
    onDeleteCollection: (collectionId: string) => void
}

const CollectionList: React.FC<CollectionListProps> = ({
    collections,
    onSelectCollection,
    onDeleteCollection,
}) => {
    if (!collections.length) {
        return <p>No collections available.</p>
    }

    return (
        <div className="flex flex-col justify-start">
            {collections.map((collection) => (
                <CardComponent
                    key={collection._id}
                    title={collection.title}
                    subtitle={collection.category}
                >
                    <div>
                        <Button onClick={() => onSelectCollection(collection)}>
                            View collection
                        </Button>
                        <Button onClick={() => onDeleteCollection(collection._id)}>
                            Delete collection
                        </Button>
                    </div>
                </CardComponent>
            ))}
        </div>
    )
}

export default CollectionList
