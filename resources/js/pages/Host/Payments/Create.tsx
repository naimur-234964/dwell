import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
// import { Amenity } from '@/types'; // Removed as Payment does not have amenities
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Payment does not have images

export default function HostPaymentCreate() { // Changed from HostPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Payment model
        booking_id: '',
        amount: '',
        payment_method: '',
        status: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.payments.store')); // Changed from host.properties.store to host.payments.store
    };

    return (
        <AppLayout>
            <Head title="Create Payment" /> {/* Changed from Create Property to Create Payment */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Payment (Host)</h1> {/* Changed from Create New Property to Create New Payment */}
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

                    <Button type="submit" disabled={processing}>Create Payment</Button> {/* Changed from Create Property to Create Payment */}
                </form>
            </div>
        </AppLayout>
    );
}
