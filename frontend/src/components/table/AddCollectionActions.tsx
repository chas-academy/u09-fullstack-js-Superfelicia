import { useState } from 'react'
import DialogComponent from '../DialogComponent'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Checkbox } from '../ui/checkbox'
import { Blocks } from 'lucide-react'
import { User } from '@/interfaces/User'
import { Collection } from '@/interfaces/Collection'

interface AddCollectionActionsProps {
    user: User
    onAddCollection: (userId: string, collectionsId: string[]) => void
    allCollections: Collection[]
}

const AddCollectionActions = ({ user, onAddCollection, allCollections }: AddCollectionActionsProps) => {
    const [selectedCollections, setSelectedCollections] = useState<string[]>([])

    const handleCollectionChange = (collectionId: string, checked: boolean) => {
        if (checked) {
            setSelectedCollections((prev) => [...prev, collectionId])
        } else {
            setSelectedCollections((prev) => prev.filter((id) => id !== collectionId))
        }
    }

    const handleConfirm = () => {
        onAddCollection(user._id, selectedCollections)
        setSelectedCollections([])
    }

    if (!user || !user._id) {
        console.error('User is undefined or missing _id:', user)
        return null
    }

    return (
        <div className="hidden sm:flex space-x-2 justify-end pr-6">
            <DialogComponent
                title={`Add collections to ${user.name}`}
                description="Select the collections you want to add."
                triggerText={<Blocks size={18} />}
                onConfirm={handleConfirm}
            >
                {allCollections.length > 0 ? (
                    <div className="w-56 max-h-60 flex flex-col space-y-4 overflow-y-auto">
                        {allCollections.map((collection) => (
                            <div
                                key={collection._id}
                                className="flex items-center justify-between space-x-2 w-48"
                            >
                                <div>
                                    <Label>{collection.name}</Label>
                                </div>
                                <div>
                                    <Checkbox
                                        id={collection._id}
                                        checked={selectedCollections.includes(collection._id)}
                                        onCheckedChange={(checked) =>
                                            handleCollectionChange(collection._id, !!checked)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No collections available</p>
                )}
            </DialogComponent>
        </div>
    )
}

export default AddCollectionActions
