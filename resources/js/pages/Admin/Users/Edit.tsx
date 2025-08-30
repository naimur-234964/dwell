import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type User } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as User does not have images
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminUserEditProps { // Changed from AdminPropertyEditProps
    user: User; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminUserEdit({ user }: AdminUserEditProps) { // Changed from AdminPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for User model
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        password_confirmation: '',
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.update', user.id)); // Changed from admin.properties.update to admin.users.update
    };

    return (
        <AppLayout>
            <Head title={`Edit User: ${user.name}`} /> {/* Changed from Edit Property: ${property.title} to Edit User: ${user.name} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit User (Admin)</CardTitle> {/* Changed from Edit Property to Edit User */}
                        <CardDescription>Editing: {user.name}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${user.name} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/users"> {/* Changed from /admin/properties to /admin/users */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
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

                            <div>
                                <Label htmlFor="password">Password (Leave blank to keep current)</Label>
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

                            <Button type="submit" disabled={processing}>Update User</Button> {/* Changed from Update Property to Update User */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
