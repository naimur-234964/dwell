import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type User } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminUserShowProps { // Changed from AdminPropertyShowProps
    user: User; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminUserShow({ user }: AdminUserShowProps) { // Changed from AdminPropertyShow
    return (
        <AppLayout>
            <Head title={`User: ${user.name}`} /> {/* Changed from Property: ${property.title} to User: ${user.name} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>User Details (Admin)</CardTitle> {/* Changed from Property Details to User Details */}
                        <CardDescription>Information about {user.name}</CardDescription> {/* Changed from Information about ${property.title} to Information about ${user.name} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/users"> {/* Changed from /admin/properties to /admin/users */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">User Information</h3> {/* Changed from General Information to User Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for User model */}
                                <p className="col-span-1"><strong>Name:</strong></p><p className="col-span-3">{user.name}</p>
                                <p className="col-span-1"><strong>Email:</strong></p><p className="col-span-3">{user.email}</p>
                                <p className="col-span-1"><strong>Role:</strong></p><p className="col-span-3">{user.role}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>User ID:</strong></p><p className="col-span-3">{user.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
