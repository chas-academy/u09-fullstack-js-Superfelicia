import { API_URL } from '@/config'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import TableComponent from './table/TableComponent'
import AddCollectionActions from './table/AddCollectionActions'
import { useCollectionsStore } from '@/store/useCollectionsStore'
import { Collection } from '@/interfaces/Collection'

const UserCollectionTable = () => {
    const user = useUserStore((state) => state.user)
    const users = useUserStore((state) => state.users)
    const setUsers = useUserStore((state) => state.setUsers)
    const fetchCollectionsForAdmin = useCollectionsStore((state) => state.fetchCollectionsForAdmin)
    const hasFetchedCollections = useCollectionsStore((state) => state.hasFetchedCollections)
    const getAllCollections = useCollectionsStore((state) => state.getAllCollections)

    const [allCollections, setAllCollections] = useState<Collection[]>([])


    useEffect(() => {
        if (!hasFetchedCollections) {
            fetchCollectionsForAdmin()
        }
    }, [hasFetchedCollections, fetchCollectionsForAdmin])

    useEffect(() => {
        const collections = getAllCollections()
        if (collections.length === 0) {
            console.log('no collections available')
        } else {
            console.log('collections available:', collections)
        }
        setAllCollections(collections)
    }, [getAllCollections])

    const handleAddCollection = async (userId: string, collectionIds: string[]) => {
        console.log(`adding collection to user with ID: ${userId}`)
        try {
            const response = await fetch(`${API_URL}/users/${userId}/collections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ collectionIds }),
            })

            if (response.ok) {
                const updatedUser = await response.json()
                console.log('Collections added successfully', updatedUser)

                if (users !== null) {
                    const updatedUsers = (users || []).map((user) =>
                        user._id === userId
                            ? { ...user, collections: updatedUser.collections }
                            : user
                    )
                    setUsers(updatedUsers)
                }
            } else {
                console.error('Failed to add collections:', await response.json())
            }
        } catch (error) {
            console.error('Error adding collections:', error)
        }
    }

    if (!user) return null

    return (
        <div className="w-fit flex items-center justify-center">
            {users && (
                <div className='w-3/4'>
                    <TableComponent
                        data={users}
                        renderActions={(user) => (
                            <AddCollectionActions
                                user={user}
                                allCollections={allCollections}
                                onAddCollection={handleAddCollection}
                            />
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default UserCollectionTable
