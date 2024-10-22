import { create } from 'zustand'

interface User {
    id: string
    name: string
    email: string
    roles: string[]
}

interface UserStore {
    user: User | null
    setUser: (user: User) => void
    clearUser: () => void
    updateUser: (updatedData: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    updateUser: (updateData) =>
        set((state) => ({
            user: { ...state.user, ...updateData } as User,
        })),
}))
