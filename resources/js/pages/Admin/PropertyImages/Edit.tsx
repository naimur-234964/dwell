import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type PropertyImage } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
import ImageUpload from '@/components/image-upload'; // Kept for image upload
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminPropertyImageEditProps { // Changed from AdminPropertyEditProps
    propertyImage: PropertyImage; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminPropertyImageEdit({ propertyImage }: AdminPropertyImageEditProps) { // Changed from AdminPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for PropertyImage model
        property_id: propertyImage.property_id,
        image: null as File | null, // Changed from images: [] as File[] to image: null as File | null
        order: propertyImage.order,
        existing_images: propertyImage.image_path ? [{ id: propertyImage.id, image_path: propertyImage.image_path }] : [], // Adapted for single image
        deleted_images: [] as number[],
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.property-images.update', propertyImage.id)); // Changed from admin.properties.update to admin.property-images.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Property Image: ${propertyImage.id}`} /> {/* Changed from Edit Property: ${property.title} to Edit Property Image: ${propertyImage.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Property Image (Admin)</CardTitle> {/* Changed from Edit Property to Edit Property Image */}
                        <CardDescription>Editing: {propertyImage.id}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${propertyImage.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/property-images"> {/* Changed from /admin/properties to /admin/property-images */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
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
                                <ImageUpload
                                    onImagesChange={(images) => setData('image', images[0] || null)}
                                    existingImages={data.existing_images}
                                    onExistingImagesChange={(images) => setData('existing_images', images)}
                                    onImageDelete={(id) => setData('deleted_images', [...data.deleted_images, id])}
                                />
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

                            <Button type="submit" disabled={processing}>Update Property Image</Button> {/* Changed from Update Property to Update Property Image */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
