import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'

interface CollectionListProps {
    collections: Collection[]
    onSelectCollection: (collection: Collection) => void
}

const CollectionList: React.FC<CollectionListProps> = ({ collections, onSelectCollection }) => {
    if (!collections.length) {
        return <p>No collections available.</p>
    }

    return (
        <div className="flex flex-col justify-start">
            <ul>
                {collections.map((collection) => (
                    <div key={collection._id} className="flex justify-start items-center space-x-4">
                        <li>
                            <h3>{collection.title}</h3>
                            <p>{collection.category}</p>
                        </li>
                        <Button onClick={() => onSelectCollection(collection)}>View collection</Button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default CollectionList
