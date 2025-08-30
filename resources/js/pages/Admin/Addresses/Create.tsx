import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { Checkbox } from '@/components/ui/checkbox'; // Removed as Address does not have this
// import { Amenity } from '@/types'; // Removed as Address does not have amenities
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Address does not have images

export default function AdminAddressCreate() { // Changed from AdminPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Address model
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.addresses.store')); // Changed from admin.properties.store to admin.addresses.store
    };

    return (
        <AppLayout>
            <Head title="Create Address" /> {/* Changed from Create Property to Create Address */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Address (Admin)</h1> {/* Changed from Create New Property to Create New Address */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TODO: Customize form fields for Address model */}
                    <div>
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            type="text"
                            value={data.street}
                            onChange={(e) => setData('street', e.target.value)}
                            className={errors.street ? 'border-red-500' : ''}
                        />
                        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                    </div>

                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                            id="state"
                            type="text"
                            value={data.state}
                            onChange={(e) => setData('state', e.target.value)}
                            className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                    </div>

                    <div>
                        <Label htmlFor="zip_code">Zip Code</Label>
                        <Input
                            id="zip_code"
                            type="text"
                            value={data.zip_code}
                            onChange={(e) => setData('zip_code', e.target.value)}
                            className={errors.zip_code ? 'border-red-500' : ''}
                        />
                        {errors.zip_code && <p className="text-red-500 text-sm">{errors.zip_code}</p>}
                    </div>

                    <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            type="text"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            className={errors.country ? 'border-red-500' : ''}
                        />
                        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Create Address</Button> {/* Changed from Create Property to Create Address */}
                </form>
            </div>
        </AppLayout>
    );
}
