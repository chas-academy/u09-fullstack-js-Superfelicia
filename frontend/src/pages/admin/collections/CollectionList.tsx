import CardComponent from '@/components/CardComponent'
import DialogComponent from '@/components/DialogComponent'
import { Button } from '@/components/ui/button'
import { Collection } from '@/interfaces/Collection'
import { Trash2 } from 'lucide-react'
import CollectionForm from './CollectionForm'

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
        <>
            <DialogComponent
                title="Create new collection"
                triggerText="Create new collection"
                onConfirm={() => console.log('New collection created')}
            >
                <CollectionForm onSubmit={() => console.log('Collection submitted')} />
            </DialogComponent>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {collections.map((collection) => (
                    <CardComponent
                        key={collection._id}
                        title={collection.name}
                        subtitle={collection.category}
                        onClick={() => onSelectCollection(collection)}
                    >
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteCollection(collection._id)
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                    </CardComponent>
                ))}
            </div>
        </>
    )
}

export default CollectionList
