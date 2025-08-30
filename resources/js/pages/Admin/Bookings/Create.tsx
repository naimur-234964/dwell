import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
// import { Amenity } from '@/types'; // Removed as Booking does not have amenities
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Booking does not have images

export default function AdminBookingCreate() { // Changed from AdminPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Booking model
        property_id: '',
        user_id: '',
        check_in_date: '',
        check_out_date: '',
        total_price: '',
        status: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.bookings.store')); // Changed from admin.properties.store to admin.bookings.store
    };

    return (
        <AppLayout>
            <Head title="Create Booking" /> {/* Changed from Create Property to Create Booking */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Booking (Admin)</h1> {/* Changed from Create New Property to Create New Booking */}
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

                    <Button type="submit" disabled={processing}>Create Booking</Button> {/* Changed from Create Property to Create Booking */}
                </form>
            </div>
        </AppLayout>
    );
}
