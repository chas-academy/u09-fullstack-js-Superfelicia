import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { useEffect, useState } from 'react'

interface User {
    _id: string
    name: string
    email: string
    roles: string[]
}

const AdminDashboardPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [editingUserId, setEditingUserId] = useState<string | null>(null)
    const [updatedUserData, setUpdatedUserData] = useState<Partial<User>>({})
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
                } else {
                    console.error('Error fetching users:', data.message)
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    const handleEditUser = (user: User) => {
        if (!user._id) {
            console.error('No userId found for user:', user)
            return
        }
        setEditingUserId(user._id)
        setUpdatedUserData({ name: user.name, email: user.email, roles: user.roles })
        // kunna ändra password
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        if (field === 'roles') {
            setUpdatedUserData({ ...updatedUserData, roles: [e.target.value] })
        } else {
            setUpdatedUserData({ ...updatedUserData, [field]: e.target.value })
        }
    }

    const handleSaveUser = async () => {
        if (!editingUserId) {
            console.error('No userId provided for update', editingUserId)
            return
        }

        console.log('Saving user with ID:', editingUserId)
        console.log('Updated user data:', updatedUserData)

        try {
            const response = await fetch(`http://localhost:3000/api/user/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedUserData),
            })

            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === editingUserId ? { ...user, ...updatedUserData } : user
                    )
                )
                setEditingUserId(null)
                setUpdatedUserData({})
            } else {
                console.error('Error updating user:', data.message)
            }
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const handleCancelEdit = () => {
        setEditingUserId(null)
        setUpdatedUserData({})
    }

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })

            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
                console.log('User deleted:', data)
            } else {
                console.error('Error deleting user:', data.message)
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

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

            <div>
                <h3>All users</h3>
                <ul>
                    {users.map((user, key) => (
                        <li key={key}>
                            {editingUserId === user._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={updatedUserData.name || ''}
                                        onChange={(e) => handleInputChange(e, 'name')}
                                    />
                                    <input
                                        type="email"
                                        value={updatedUserData.email || ''}
                                        onChange={(e) => handleInputChange(e, 'email')}
                                    />
                                    <select
                                        value={updatedUserData.roles?.[0]}
                                        onChange={(e) => handleInputChange(e, 'roles')}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button onClick={handleSaveUser}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    {user.name} ({user.email}) - Roles: {user.roles.join(', ')}
                                    <button onClick={() => handleEditUser(user)}>Update</button>
                                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminDashboardPage
