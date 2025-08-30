import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Amenity } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminAmenityShowProps { // Changed from AdminPropertyShowProps
    amenity: Amenity; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminAmenityShow({ amenity }: AdminAmenityShowProps) { // Changed from AdminPropertyShow
    return (
        <AppLayout>
            <Head title={`Amenity: ${amenity.name}`} /> {/* Changed from Property: ${property.title} to Amenity: ${amenity.name} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Amenity Details (Admin)</CardTitle> {/* Changed from Property Details to Amenity Details */}
                        <CardDescription>Information about {amenity.name}</CardDescription> {/* Changed from Information about ${property.title} to Information about ${amenity.name} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/amenities"> {/* Changed from /admin/properties to /admin/amenities */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Amenity Information</h3> {/* Changed from General Information to Amenity Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for Amenity model */}
                                <p className="col-span-1"><strong>Name:</strong></p><p className="col-span-3">{amenity.name}</p>
                                <p className="col-span-1"><strong>Description:</strong></p><p className="col-span-3">{amenity.description}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Amenity ID:</strong></p><p className="col-span-3">{amenity.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
