import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Address } from '@/types'; // Changed from Property, Amenity, PropertyImage
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminAddressShowProps { // Changed from AdminPropertyShowProps
    address: Address; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminAddressShow({ address }: AdminAddressShowProps) { // Changed from AdminPropertyShow
    return (
        <AppLayout>
            <Head title={`Address: ${address.street}`} /> {/* Changed from Property: ${property.title} to Address: ${address.street} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Address Details (Admin)</CardTitle> {/* Changed from Property Details to Address Details */}
                        <CardDescription>Information about {address.street}</CardDescription> {/* Changed from Information about ${property.title} to Information about ${address.street} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/addresses"> {/* Changed from /admin/properties to /admin/addresses */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Address Information</h3> {/* Changed from General Information to Address Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for Address model */}
                                <p className="col-span-1"><strong>Street:</strong></p><p className="col-span-3">{address.street}</p>
                                <p className="col-span-1"><strong>City:</strong></p><p className="col-span-3">{address.city}</p>
                                <p className="col-span-1"><strong>State:</strong></p><p className="col-span-3">{address.state}</p>
                                <p className="col-span-1"><strong>Zip Code:</strong></p><p className="col-span-3">{address.zip_code}</p>
                                <p className="col-span-1"><strong>Country:</strong></p><p className="col-span-3">{address.country}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Address ID:</strong></p><p className="col-span-3">{address.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
