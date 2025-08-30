import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type User } from '@/types'; // Changed from Property to User
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface AdminUserIndexProps { // Changed from AdminPropertyIndexProps to AdminUserIndexProps
    users: { // Changed from properties to users
        data: User[]; // Changed from Property[] to User[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function AdminUserIndex({ users }: AdminUserIndexProps) { // Changed from AdminPropertyIndex to AdminUserIndex and properties to users
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.data.filter(user => // Changed from filteredProperties to filteredUsers and property to user
        // TODO: Customize search fields for User model
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) { // Changed from property to user
            router.delete(`/admin/users/${id}`); // Changed from /admin/properties to /admin/users
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Users" /> {/* Changed from Admin Properties to Admin Users */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin Users</h1> {/* Changed from Admin Properties to Admin Users */}
                    <Link href="/admin/users/create"> {/* Changed from /admin/properties/create to /admin/users/create */}
                        <Button>Create User</Button> {/* Changed from Create Property to Create User */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search users..." // Changed from Search properties to Search users
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredUsers.length > 0 ? ( // Changed from filteredProperties to filteredUsers
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for User model */}
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    {/* TODO: Customize table cells for User model */}
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/admin/users/${user.id}`}> {/* Changed from /admin/properties to /admin/users */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/admin/users/${user.id}/edit`}> {/* Changed from /admin/properties to /admin/users */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No users found matching your search.</p> {/* Changed from No properties to No users */}
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {users.from} to {users.to} of {users.total} entries {/* Changed from properties to users */}
                    </div>
                    <div className="flex gap-2">
                        {users.links.map((link, index) => ( {/* Changed from properties to users */}
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 border rounded-md ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                preserveScroll
                            >
                                {link.label.replace(/&laquo;|&raquo;/g, '')}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
