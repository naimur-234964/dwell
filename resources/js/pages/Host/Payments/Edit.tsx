import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type Payment } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Payment does not have images
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HostPaymentEditProps { // Changed from HostPropertyEditProps
    payment: Payment; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function HostPaymentEdit({ payment }: HostPaymentEditProps) { // Changed from HostPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Payment model
        booking_id: payment.booking_id,
        amount: payment.amount,
        payment_method: payment.payment_method,
        status: payment.status,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.payments.update', payment.id)); // Changed from host.properties.update to host.payments.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Payment: ${payment.id}`} /> {/* Changed from Edit Property: ${property.title} to Edit Payment: ${payment.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Payment (Host)</CardTitle> {/* Changed from Edit Property to Edit Payment */}
                        <CardDescription>Editing: {payment.id}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${payment.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/host/payments"> {/* Changed from /host/properties to /host/payments */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* TODO: Customize form fields for Payment model */}
                            <div>
                                <Label htmlFor="booking_id">Booking ID</Label>
                                <Input
                                    id="booking_id"
                                    type="number"
                                    value={data.booking_id}
                                    onChange={(e) => setData('booking_id', e.target.value)}
                                    className={errors.booking_id ? 'border-red-500' : ''}
                                />
                                {errors.booking_id && <p className="text-red-500 text-sm">{errors.booking_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className={errors.amount ? 'border-red-500' : ''}
                                />
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                            </div>

                            <div>
                                <Label htmlFor="payment_method">Payment Method</Label>
                                <Input
                                    id="payment_method"
                                    type="text"
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className={errors.payment_method ? 'border-red-500' : ''}
                                />
                                {errors.payment_method && <p className="text-red-500 text-sm">{errors.payment_method}</p>}
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

                            <Button type="submit" disabled={processing}>Update Payment</Button> {/* Changed from Update Property to Update Payment */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
