import { User } from '@/pages/admin/adminDashboardPage'
import { useUserStore } from '@/store/useUserStore'
import { useState } from 'react'
import DialogComponent from '../DialogComponent'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Checkbox } from '../ui/checkbox'
import { Blocks } from 'lucide-react'

interface AddCollectionActionsProps {
    user: User
    onAddCollection: (userId: string, collectionsId: string[]) => void
}

const AddCollectionActions = ({ user, onAddCollection }: AddCollectionActionsProps) => {
    const collections = useUserStore((state) => state.collections) || []
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
        <DialogComponent
            title={`Add collections to ${user.name}`}
            description="Select the collections you want to add."
            triggerText={<Blocks size={18}/>}
            onConfirm={handleConfirm}
        >
            {collections?.length > 0 ? (
                <div className="w-56 max-h-60 flex flex-col space-y-4 overflow-y-auto">
                    {collections?.map((collection) => (
                        <div key={collection._id} className="flex items-center justify-between space-x-2 w-48">
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
    )
}

export default AddCollectionActions
