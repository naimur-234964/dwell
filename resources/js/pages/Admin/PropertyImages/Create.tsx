import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
// import { Amenity } from '@/types'; // Removed as PropertyImage does not have amenities
// import { useState } 'react'; // Removed if not used
import ImageUpload from '@/components/image-upload'; // Kept for image upload

export default function AdminPropertyImageCreate() { // Changed from AdminPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for PropertyImage model
        property_id: '',
        image: null as File | null, // Changed from images: [] as File[] to image: null as File | null
        order: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.property-images.store')); // Changed from admin.properties.store to admin.property-images.store
    };

    return (
        <AppLayout>
            <Head title="Create Property Image" /> {/* Changed from Create Property to Create Property Image */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Property Image (Admin)</h1> {/* Changed from Create New Property to Create New Property Image */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TODO: Customize form fields for PropertyImage model */}
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

                    {/* Image Upload */}
                    <div>
                        <ImageUpload onImagesChange={(images) => setData('image', images[0] || null)} /> {/* Adapted for single image upload */}
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <div>
                        <Label htmlFor="order">Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', e.target.value)}
                            className={errors.order ? 'border-red-500' : ''}
                        />
                        {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Create Property Image</Button> {/* Changed from Create Property to Create Property Image */}
                </form>
            </div>
        </AppLayout>
    );
}
