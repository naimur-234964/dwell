import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
// import { Amenity } from '@/types'; // Removed as User does not have amenities
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as User does not have images

export default function AdminUserCreate() { // Changed from AdminPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for User model
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store')); // Changed from admin.properties.store to admin.users.store
    };

    return (
        <AppLayout>
            <Head title="Create User" /> {/* Changed from Create Property to Create User */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New User (Admin)</h1> {/* Changed from Create New Property to Create New User */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TODO: Customize form fields for User model */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={errors.password_confirmation ? 'border-red-500' : ''}
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                    </div>

                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                            id="role"
                            type="text"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className={errors.role ? 'border-red-500' : ''}
                        />
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Create User</Button> {/* Changed from Create Property to Create User */}
                </form>
            </div>
        </AppLayout>
    );
}
