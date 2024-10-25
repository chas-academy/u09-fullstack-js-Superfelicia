import { API_URL } from '@/config'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'
import TableComponent from './table/TableComponent'
import AddCollectionActions from './table/AddCollectionActions'

const UserCollectionTable = () => {
    const user = useUserStore((state) => state.user)
    const users = useUserStore((state) => state.users)
    const setUsers = useUserStore((state) => state.setUsers)
    const collections = useUserStore((state) => state.collections)
    const setCollections = useUserStore((state) => state.setCollections)

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await fetch(`${API_URL}/collections`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                if (response.ok) {
                    const collectionsData = await response.json()
                    setCollections(collectionsData)
                } else {
                    console.error('Error fetching collections:', await response.json())
                }
            } catch (error) {
                console.error('Error fetching collections:', error)
            }
        }

        fetchCollections()
    }, [setCollections])

    useEffect(() => {
        if (collections && collections.length === 0) {
            console.log('no collections available')
        } else {
            console.log('collections available:', collections)
        }
    }, [collections])

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
