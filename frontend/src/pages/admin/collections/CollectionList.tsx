import CardComponent from '@/components/CardComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { Trash2 } from 'lucide-react'

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {collections.map((collection) => (
                <CardComponent
                    key={collection._id}
                    title={collection.name}
                    subtitle={collection.category}
                    onClick={() => onSelectCollection(collection)}
                >
                    <div>
                        <Button onClick={() => onDeleteCollection(collection._id)}>
                            <Trash2 size={16}/>
                        </Button>
                    </div>
                </CardComponent>
            ))}
        </div>
    )
}

export default CollectionList
