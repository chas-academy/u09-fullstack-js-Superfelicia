import { API_URL } from '@/config'
import { Collection } from '@/interfaces/Collection'
import { create } from 'zustand'

interface CollectionsStore {
    collections: {
        currentCollections: Collection[]
        completedCollections: Collection[]
        upcomingCollections: Collection[]
    }
    hasFetchedCollections: boolean
    setCollections: (collections: {
        currentCollections: Collection[]
        completedCollections: Collection[]
        upcomingCollections: Collection[]
    }) => void
    clearCollections: () => void
    fetchCollectionsForAdmin: () => Promise<void>
    fetchCollectionsForUser: (userId: string) => Promise<void>
}

export const useCollectionsStore = create<CollectionsStore>((set) => ({
    collections: {
        currentCollections: [],
        completedCollections: [],
        upcomingCollections: [],
    },
    hasFetchedCollections: false,
    setCollections: (collections) => {
        console.log('Setting collections:', collections)
        set({ collections, hasFetchedCollections: true })
    },
    clearCollections: () =>
        set({
            collections: {
                currentCollections: [],
                completedCollections: [],
                upcomingCollections: [],
            },
            hasFetchedCollections: false,
        }),

    fetchCollectionsForAdmin: async () => {
        try {
            const response = await fetch(`${API_URL}/collections`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data: Collection[] = await response.json()

            if (response.ok && Array.isArray(data)) {
                console.log('Fetched collections for admin:', data)
                const categorizedCollections = {
                    currentCollections: data.filter(
                        (collection) => collection.status === 'in progress'
                    ),
                    completedCollections: data.filter(
                        (collection) => collection.status === 'completed'
                    ),
                    upcomingCollections: data.filter(
                        (collection) => collection.status === 'not started'
                    ),
                }
                set({ collections: categorizedCollections, hasFetchedCollections: true })
            } else {
                console.error('Error fetching collections for admin:', data)
            }
        } catch (error) {
            console.error('Error fetching collection for admin:', error)
        }
    },

    fetchCollectionsForUser: async (userId: string) => {
        try {
            const response = await fetch(`${API_URL}/users/${userId}/collections`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data: {
                currentCollections: Collection[]
                completedCollections: Collection[]
                upcomingCollections: Collection[]
            } = await response.json()
            console.log('Data fetched from API:', data)

            if (
                response.ok &&
                data &&
                Array.isArray(data.currentCollections) &&
                Array.isArray(data.completedCollections) &&
                Array.isArray(data.upcomingCollections)
            ) {
                set({
                    collections: {
                        currentCollections: data.currentCollections,
                        completedCollections: data.completedCollections,
                        upcomingCollections: data.upcomingCollections,
                    },
                    hasFetchedCollections: true,
                })
                console.log('Fetched collections for user:', data)
            } else {
                console.error('Error fetching collections:', data)
            }
        } catch (error) {
            console.error('Error fetching collections for user:', error)
        }
    },
}))
