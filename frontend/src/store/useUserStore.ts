import { User } from '@/interfaces/User'
import { create } from 'zustand'

interface UserStore {
    user: User | null
    users: User[] | null
    setUser: (user: User) => void
    setUsers: (users: User[]) => void
    clearUser: () => void
    updateUser: (updatedData: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    users: null,
    setUser: (user) => set({ user }),
    setUsers: (users) => set({ users }),
    clearUser: () => set({ user: null }),
    updateUser: (updateData) =>
        set((state) => ({
            user: { ...state.user, ...updateData } as User,
        })),
}))
