import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'

interface CollectionListProps {
    collections: Collection[]
    onEdit: (collection: Collection) => void
}

const CollectionList: React.FC<CollectionListProps> = ({ collections, onEdit }) => {
    if (!collections.length) {
        return <p>No collections available.</p>
    }

    return (
        <div className="flex justify-start">
            <ul>
                {collections.map((collection) => (
                    <div key={collection._id} className="flex justify-start items-center space-x-4">
                        <li>
                            <h3>{collection.title}</h3>
                            <p>{collection.category}</p>
                        </li>
                        <Button onClick={() => onEdit(collection)}>Edit</Button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default CollectionList
