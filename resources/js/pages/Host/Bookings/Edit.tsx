import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type Booking } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Booking does not have images
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HostBookingEditProps { // Changed from HostPropertyEditProps
    booking: Booking; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function HostBookingEdit({ booking }: HostBookingEditProps) { // Changed from HostPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Booking model
        property_id: booking.property_id,
        user_id: booking.user_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        total_price: booking.total_price,
        status: booking.status,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.bookings.update', booking.id)); // Changed from host.properties.update to host.bookings.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Booking: ${booking.id}`} /> {/* Changed from Edit Property: ${property.title} to Edit Booking: ${booking.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Booking (Host)</CardTitle> {/* Changed from Edit Property to Edit Booking */}
                        <CardDescription>Editing: {booking.id}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${booking.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/host/bookings"> {/* Changed from /host/properties to /host/bookings */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* TODO: Customize form fields for Booking model */}
                            <div>
                                <Label htmlFor="property_id">Property ID</Label>
                                <Input
                                    id="property_id"
                                    type="number"
                                    value={data.property_id}
                                    onChange={(e) => setData('property_id', e.target.value)}
                                    className={errors.property_id ? 'border-red-500' : ''}
                                />
                                {errors.property_id && <p className="text-red-500 text-sm">{errors.property_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="user_id">User ID</Label>
                                <Input
                                    id="user_id"
                                    type="number"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className={errors.user_id ? 'border-red-500' : ''}
                                />
                                {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="check_in_date">Check-in Date</Label>
                                <Input
                                    id="check_in_date"
                                    type="date"
                                    value={data.check_in_date}
                                    onChange={(e) => setData('check_in_date', e.target.value)}
                                    className={errors.check_in_date ? 'border-red-500' : ''}
                                />
                                {errors.check_in_date && <p className="text-red-500 text-sm">{errors.check_in_date}</p>}
                            </div>

                            <div>
                                <Label htmlFor="check_out_date">Check-out Date</Label>
                                <Input
                                    id="check_out_date"
                                    type="date"
                                    value={data.check_out_date}
                                    onChange={(e) => setData('check_out_date', e.target.value)}
                                    className={errors.check_out_date ? 'border-red-500' : ''}
                                />
                                {errors.check_out_date && <p className="text-red-500 text-sm">{errors.check_out_date}</p>}
                            </div>

                            <div>
                                <Label htmlFor="total_price">Total Price</Label>
                                <Input
                                    id="total_price"
                                    type="number"
                                    step="0.01"
                                    value={data.total_price}
                                    onChange={(e) => setData('total_price', e.target.value)}
                                    className={errors.total_price ? 'border-red-500' : ''}
                                />
                                {errors.total_price && <p className="text-red-500 text-sm">{errors.total_price}</p>}
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Input
                                    id="status"
                                    type="text"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={errors.status ? 'border-red-500' : ''}
                                />
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>Update Booking</Button> {/* Changed from Update Property to Update Booking */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
