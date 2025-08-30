import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Booking } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface HostBookingShowProps { // Changed from HostPropertyShowProps
    booking: Booking; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function HostBookingShow({ booking }: HostBookingShowProps) { // Changed from HostPropertyShow
    return (
        <AppLayout>
            <Head title={`Booking: ${booking.id}`} /> {/* Changed from Property: ${property.title} to Booking: ${booking.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Booking Details (Host)</CardTitle> {/* Changed from Property Details to Booking Details */}
                        <CardDescription>Information about Booking ID: {booking.id}</CardDescription> {/* Changed from Information about ${property.title} to Information about Booking ID: ${booking.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/host/bookings"> {/* Changed from /host/properties to /host/bookings */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Booking Information</h3> {/* Changed from General Information to Booking Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for Booking model */}
                                <p className="col-span-1"><strong>Property ID:</strong></p><p className="col-span-3">{booking.property_id}</p>
                                <p className="col-span-1"><strong>User ID:</strong></p><p className="col-span-3">{booking.user_id}</p>
                                <p className="col-span-1"><strong>Check-in Date:</strong></p><p className="col-span-3">{booking.check_in_date}</p>
                                <p className="col-span-1"><strong>Check-out Date:</strong></p><p className="col-span-3">{booking.check_out_date}</p>
                                <p className="col-span-1"><strong>Total Price:</strong></p><p className="col-span-3">{booking.total_price}</p>
                                <p className="col-span-1"><strong>Status:</strong></p><p className="col-span-3">{booking.status}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Booking ID:</strong></p><p className="col-span-3">{booking.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
