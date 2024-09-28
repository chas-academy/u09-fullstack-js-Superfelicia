import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { useEffect, useState } from 'react'
import SearchComponent from '../../components/searchComponent'
import TableComponent from '@/components/table/TableComponent'

export interface User {
    _id: string
    name: string
    email: string
    roles: string[]
    [key: string]: any
}

const AdminDashboardPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const navigate = useNavigate()
    const user = useUserStore((state) => state.user)
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
        console.log('Logged out')
    }

    const handleCreateUser = () => {
        navigate('/admin/create-user')
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users', {
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
    }, [])

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredUsers(users)
        } else {
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredUsers(filtered)
        }
        console.log(filteredUsers)
    }

    const handleEditUser = async (updatedUser: User) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedUser),
            })

            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                )
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
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
                console.log('User deleted:', data)
            } else {
                console.error('Error deleting user:', data.message)
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    console.log(filteredUsers)
    if (!user) return null

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user.name}</p>
            <p>Your role: {user.roles.join(', ')}</p>

            <div className="flex flex-col">
                <h3>Manage users</h3>
                <button onClick={handleCreateUser}>Create user</button>
                <button>Update user</button>
                <button>Delete user</button>
            </div>

            <SearchComponent onSearch={handleSearch} placeholder="Search users..." />

            <div>
                <h3>All users</h3>
                <TableComponent
                    data={filteredUsers}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminDashboardPage
