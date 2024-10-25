import CardComponent from '@/components/CardComponent'
import DialogComponent from '@/components/DialogComponent'
import { Collection } from '@/interfaces/Collection'
import { Edit, Trash2 } from 'lucide-react'
import CollectionForm from './CollectionForm'

interface CollectionListProps {
    collections: Collection[] | undefined
    onSelectCollection: (collection: Collection) => void
    onDeleteCollection: (collectionId: string) => void
    onEditCollection: (collection: Collection) => void
}

const CollectionList = ({
    collections = [],
    onSelectCollection,
    onDeleteCollection,
    onEditCollection,
}: CollectionListProps) => {
    if (!collections.length) {
        return <p>No collections available.</p>
    }

    return (
        <>
            {collections && collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    {collections.map((collection) => (
                        <CardComponent
                            key={collection._id}
                            title={collection.name}
                            subtitle={collection.category}
                            onClick={() => onSelectCollection(collection)}
                        >
                            <div className="flex justify-center space-x-2">
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
                                    <CollectionForm
                                        collection={collection}
                                        onSubmit={onEditCollection}
                                    />
                                </DialogComponent>
                            </div>
                        </CardComponent>
                    ))}
                </div>
            ) : (
                <p>No collections available</p>
            )}
        </>
    )
}

export default CollectionList
