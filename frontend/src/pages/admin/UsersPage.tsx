import { useEffect, useState } from 'react';
import SearchComponent from '@/components/searchComponent';
import TableComponent from '@/components/table/TableComponent';
import DialogComponent from '@/components/DialogComponent';
import CreateUserComponent from '@/components/createUserComponent';
import { Plus } from 'lucide-react';

export interface User {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    [key: string]: any;
}

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setUsers(data);
                    setFilteredUsers(data);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleCreateUser = async (formData: { [key: string]: string }) => {
        const { name, email, password, roles } = formData;

        try {
            const response = await fetch('http://localhost:3000/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, roles }),
            });

            const data = await response.json();

            if (response.ok) {
                setUsers((prevUsers) => [...prevUsers, data]);
                setFilteredUsers((prevUsers) => [...prevUsers, data]);
                console.log('User created:', data);
            } else {
                console.error(data.message || 'Error registering user');
            }
        } catch (error) {
            console.error('Error registering user');
        }
    };

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    const handleEditUser = async (updatedUser: User) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                );
                setFilteredUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                );
            } else {
                console.error('Error updating user:', data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                console.log('User deleted:', data);
            } else {
                console.error('Error deleting user:', data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-5">
            <h2>User Management</h2>
            <div className="w-full px-10 flex justify-between items-center">
                <SearchComponent onSearch={handleSearch} placeholder="Search users..." />
                <DialogComponent
                    title="Create new user"
                    triggerText={<Plus size={16} />}
                    onConfirm={() => {}}
                >
                    <CreateUserComponent
                        buttonText="Create user"
                        onSubmit={handleCreateUser}
                        closeDialog={() => console.log('closing dialog')}
                    />
                </DialogComponent>
            </div>

            <div className="w-full px-10">
                <TableComponent
                    data={filteredUsers}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    );
};

export default UsersPage;
