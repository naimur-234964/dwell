import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Property } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface HostPropertyShowProps {
    property: Property;
}

export default function HostPropertyShow({ property }: HostPropertyShowProps) {
    return (
        <AppLayout>
            <Head title={`Property: ${property.title}`} />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Property Details (Host)</CardTitle>
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
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Property ID:</strong></p><p className="col-span-3">{property.id}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Link href={`/host/properties/${property.id}/edit`}>
                                <Button>Edit Property</Button>
                            </Link>
                            <Link href="/host/properties">
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
