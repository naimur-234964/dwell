import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type PropertyImage } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminPropertyImageShowProps { // Changed from AdminPropertyShowProps
    propertyImage: PropertyImage; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminPropertyImageShow({ propertyImage }: AdminPropertyImageShowProps) { // Changed from AdminPropertyShow
    return (
        <AppLayout>
            <Head title={`Property Image: ${propertyImage.id}`} /> {/* Changed from Property: ${property.title} to Property Image: ${propertyImage.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Property Image Details (Admin)</CardTitle> {/* Changed from Property Details to Property Image Details */}
                        <CardDescription>Information about Property Image ID: {propertyImage.id}</CardDescription> {/* Changed from Information about ${property.title} to Information about Property Image ID: ${propertyImage.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/property-images"> {/* Changed from /admin/properties to /admin/property-images */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                        {propertyImage.image_path && (
                            <div className="mt-4 flex flex-wrap gap-4">
                                <img
                                    src={`/storage/${propertyImage.image_path}`}
                                    alt={`Property Image ${propertyImage.id}`}
                                    className="w-[300px] h-64 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Property Image Information</h3> {/* Changed from General Information to Property Image Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for PropertyImage model */}
                                <p className="col-span-1"><strong>Property ID:</strong></p><p className="col-span-3">{propertyImage.property_id}</p>
                                <p className="col-span-1"><strong>Image Path:</strong></p><p className="col-span-3">{propertyImage.image_path}</p>
                                <p className="col-span-1"><strong>Order:</strong></p><p className="col-span-3">{propertyImage.order}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Property Image ID:</strong></p><p className="col-span-3">{propertyImage.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
