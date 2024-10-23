import { Collection } from '@/interfaces/Collection'
import { User } from '@/pages/admin/UsersPage'
import { create } from 'zustand'

interface UserStore {
    user: User | null
    users: User[] | null
    collections: Collection[] | null
    setUser: (user: User) => void
    setUsers: (users: User[]) => void
    clearUser: () => void
    setCollections: (collections: Collection[]) => void
    clearCollections: () => void
    updateUser: (updatedData: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    users: null,
    collections: null,
    setUser: (user) => set({ user }),
    setUsers: (users) => set({ users }),
    setCollections: (collections) => set({ collections }),
    clearUser: () => set({ user: null }),
    clearCollections: () => set({ collections: null }),
    updateUser: (updateData) =>
        set((state) => ({
            user: { ...state.user, ...updateData } as User,
        })),
}))
