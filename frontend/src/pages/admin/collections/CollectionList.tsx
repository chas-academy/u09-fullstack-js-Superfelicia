import CardComponent from '@/components/CardComponent'
import DialogComponent from '@/components/DialogComponent'
import { Collection } from '@/interfaces/Collection'
import { Edit, Trash2 } from 'lucide-react'
import CollectionForm from './CollectionForm'

interface CollectionListProps {
    collections: Collection[]
    onSelectCollection: (collection: Collection) => void
    onDeleteCollection: (collectionId: string) => void
    onEditCollection: (collection: Collection) => void
}

const CollectionList: React.FC<CollectionListProps> = ({
    collections,
    onSelectCollection,
    onDeleteCollection,
    onEditCollection,
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
                        <DialogComponent
                            title="Delete collection"
                            description={`Are your sure you want to delete ${collection.name}?`}
                            triggerText={<Trash2 size={14} />}
                            onConfirm={() => onDeleteCollection(collection._id)}
                            isDeleteConfirmation={true}
                        />
                        <DialogComponent
                            title="Edit collection"
                            description={`Edit details for ${collection.name} collection`}
                            triggerText={<Edit size={14} />}
                            onConfirm={() => onEditCollection(collection)}
                            isDeleteConfirmation={false}
                        >
                            <CollectionForm collection={collection} onSubmit={() => onEditCollection(collection)}/>
                        </DialogComponent>
                    </CardComponent>
                ))}
            </div>
        </>
    )
}

export default CollectionList
