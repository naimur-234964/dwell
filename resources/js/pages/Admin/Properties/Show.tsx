import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Amenity, Property, Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminPropertyShowProps {
    property: Property & { address: Address; amenities: Amenity[] };
}

export default function AdminPropertyShow({ property }: AdminPropertyShowProps) {
    return (
        <AppLayout>
            <Head title={`Property: ${property.title}`} />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Property Details (Admin)</CardTitle>
                        <CardDescription>Information about {property.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">General Information</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Title:</strong></p><p className="col-span-3">{property.title}</p>
                                <p className="col-span-1"><strong>Description:</strong></p><p className="col-span-3">{property.description}</p>
                                <p className="col-span-1"><strong>Price per Night:</strong></p><p className="col-span-3">${property.price_per_night}</p>
                                <p className="col-span-1"><strong>Is Available:</strong></p><p className="col-span-3">{property.is_available ? 'Yes' : 'No'}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Capacity & Rooms</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Number of Guests:</strong></p><p className="col-span-3">{property.number_of_guests}</p>
                                <p className="col-span-1"><strong>Number of Bedrooms:</strong></p><p className="col-span-3">{property.number_of_bedrooms}</p>
                                <p className="col-span-1"><strong>Number of Beds:</strong></p><p className="col-span-3">{property.number_of_beds}</p>
                                <p className="col-span-1"><strong>Number of Bathrooms:</strong></p><p className="col-span-3">{property.number_of_bathrooms}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((amenity) => (
                                    <span key={amenity.id} className="bg-gray-200 rounded-md px-2 py-1 text-sm">{amenity.name}</span>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Address Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Address Line 1:</strong></p><p className="col-span-3">{property.address.address_line_1}</p>
                                {property.address.address_line_2 && (
                                    <>
                                        <p className="col-span-1"><strong>Address Line 2:</strong></p><p className="col-span-3">{property.address.address_line_2}</p>
                                    </>
                                )}
                                <p className="col-span-1"><strong>City:</strong></p><p className="col-span-3">{property.address.city}</p>
                                <p className="col-span-1"><strong>State:</strong></p><p className="col-span-3">{property.address.state}</p>
                                <p className="col-span-1"><strong>Zip Code:</strong></p><p className="col-span-3">{property.address.zip_code}</p>
                                <p className="col-span-1"><strong>Country:</strong></p><p className="col-span-3">{property.address.country}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Property ID:</strong></p><p className="col-span-3">{property.id}</p>
                                <p className="col-span-1"><strong>Host ID:</strong></p><p className="col-span-3">{property.user_id}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Link href={`/admin/properties/${property.id}/edit`}>
                                <Button>Edit Property</Button>
                            </Link>
                            <Link href="/admin/properties">
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
