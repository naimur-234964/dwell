import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Location } from '@/types'; // Import Location type
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminLocationShowProps {
    location: Location;
}

export default function AdminLocationShow({ location }: AdminLocationShowProps) {
    return (
        <AppLayout>
            <Head title={`Location: ${location.name}`} />
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Location Details</CardTitle>
                        <CardDescription>Information about {location.name}</CardDescription>
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/locations">
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                        {location.image_path && (
                            <div className="mt-4">
                                <img
                                    src={`/storage/${location.image_path}`}
                                    alt={location.name}
                                    className="w-64 h-64 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">General Information</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>ID:</strong></p><p className="col-span-3">{location.id}</p>
                                <p className="col-span-1"><strong>Name:</strong></p><p className="col-span-3">{location.name}</p>
                                <p className="col-span-1"><strong>Created At:</strong></p><p className="col-span-3">{new Date(location.created_at).toLocaleString()}</p>
                                <p className="col-span-1"><strong>Updated At:</strong></p><p className="col-span-3">{new Date(location.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}