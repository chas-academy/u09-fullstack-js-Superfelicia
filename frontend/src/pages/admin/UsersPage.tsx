import { useEffect, useState } from 'react'
import SearchComponent from '@/components/searchComponent'
import TableComponent from '@/components/table/TableComponent'
import DialogComponent from '@/components/DialogComponent'
import CreateUserComponent from '@/components/createUserComponent'
import { Plus } from 'lucide-react'
import { API_URL } from '@/config'
import { useUserStore } from '@/store/useUserStore'
import Actions from '@/components/table/Actions'

export interface User {
    _id: string
    name: string
    email: string
    roles: string[]
    [key: string]: any
}

const UsersPage = () => {
    const users = useUserStore((state) => state.users)
    const setUsers = useUserStore((state) => state.setUsers)
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users || [])

    useEffect(() => {
        if (users) {
            setFilteredUsers(users)
        } else {
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`${API_URL}/users`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })

                    const data = await response.json()
                    if (response.ok) {
                        setUsers(data)
                        setFilteredUsers(data)
                    } else {
                        console.error('Error fetching users:', data.message)
                    }
                } catch (error) {
                    console.error('Error fetching users:', error)
                }
            }
            fetchUsers()
        }
    }, [users, setUsers])

    const handleUserAdded = (newUser: User) => {
        if (users) {
            setUsers([...users, newUser])
        } else {
            setUsers([newUser])
        }
        setFilteredUsers((prevUsers) => [...prevUsers, newUser])
    }

    const handleSearch = (searchTerm: string, role: string) => {
        let filtered = users || []

        if (searchTerm) {
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (role !== 'all') {
            filtered = filtered.filter((user) => user.roles.includes(role))
        }

        setFilteredUsers(filtered)
    }

    const handleEditUser = async (updatedUser: User) => {
        try {
            const response = await fetch(`${API_URL}/user/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedUser),
            })

            const data = await response.json()

            if (response.ok) {
                if (users) {
                    setUsers(
                        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                    )
                }

                setFilteredUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                )
            } else {
                console.error('Error updating user:', data.message)
            }
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const data = await response.json()

            if (response.ok) {
                if (users) {
                    setUsers(users.filter((user) => user._id !== userId))
                }

                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
                console.log('User deleted:', data)
            } else {
                console.error('Error deleting user:', data.message)
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    return (
        <div className="overflow-hidden flex flex-col items-center justify-center space-y-5 p-10">
            <div className="w-full sm:px-10 flex justify-between items-center">
                <SearchComponent onSearch={handleSearch} placeholder="Search users..." />
                <div className="pl-2">
                    <DialogComponent
                        title="Create new user"
                        triggerText={<Plus size={16} />}
                        onConfirm={() => {}}
                        showActions={false}
                    >
                        {({ closeDialog }) => (
                            <CreateUserComponent
                                buttonText="Create user"
                                apiEndpoint={`${API_URL}/auth/user`}
                                onSubmit={(newUser) => {
                                    handleUserAdded(newUser)
                                    closeDialog()
                                }}
                                onCancel={closeDialog}
                            />
                        )}
                    </DialogComponent>
                </div>
            </div>

            <div className="w-full max-h-full sm:px-10 overflow-auto">
                <TableComponent
                    data={filteredUsers}
                    renderActions={(user) => (
                        <Actions rowData={user} onEdit={handleEditUser} onDelete={handleDeleteUser}/>
                    )}
                />
            </div>
        </div>
    )
}

export default UsersPage
