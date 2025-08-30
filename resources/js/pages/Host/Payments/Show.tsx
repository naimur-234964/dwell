import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Payment } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface HostPaymentShowProps { // Changed from HostPropertyShowProps
    payment: Payment; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function HostPaymentShow({ payment }: HostPaymentShowProps) { // Changed from HostPropertyShow
    return (
        <AppLayout>
            <Head title={`Payment: ${payment.id}`} /> {/* Changed from Property: ${property.title} to Payment: ${payment.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Payment Details (Host)</CardTitle> {/* Changed from Property Details to Payment Details */}
                        <CardDescription>Information about Payment ID: {payment.id}</CardDescription> {/* Changed from Information about ${property.title} to Information about Payment ID: ${payment.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/host/payments"> {/* Changed from /host/properties to /host/payments */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Payment Information</h3> {/* Changed from General Information to Payment Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for Payment model */}
                                <p className="col-span-1"><strong>Booking ID:</strong></p><p className="col-span-3">{payment.booking_id}</p>
                                <p className="col-span-1"><strong>Amount:</strong></p><p className="col-span-3">{payment.amount}</p>
                                <p className="col-span-1"><strong>Payment Method:</strong></p><p className="col-span-3">{payment.payment_method}</p>
                                <p className="col-span-1"><strong>Status:</strong></p><p className="col-span-3">{payment.status}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Payment ID:</strong></p><p className="col-span-3">{payment.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
