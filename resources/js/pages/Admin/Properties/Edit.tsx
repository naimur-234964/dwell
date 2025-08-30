import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { type Property } from '@/types';

interface AdminPropertyEditProps {
    property: Property;
}

export default function AdminPropertyEdit({ property }: AdminPropertyEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: property.title,
        description: property.description,
        price_per_night: property.price_per_night,
        number_of_guests: property.number_of_guests,
        number_of_bedrooms: property.number_of_bedrooms,
        number_of_beds: property.number_of_beds,
        number_of_bathrooms: property.number_of_bathrooms,
        is_available: property.is_available,
        user_id: property.user_id, // Admin can change the owner
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.properties.update', property.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Property: ${property.title}`} />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Edit Property (Admin)</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="price_per_night">Price per Night</Label>
                        <Input
                            id="price_per_night"
                            type="number"
                            step="0.01"
                            value={data.price_per_night}
                            onChange={(e) => setData('price_per_night', e.target.value)}
                            className={errors.price_per_night ? 'border-red-500' : ''}
                        />
                        {errors.price_per_night && <p className="text-red-500 text-sm">{errors.price_per_night}</p>}
                    </div>

                    <div>
                        <Label htmlFor="number_of_guests">Number of Guests</Label>
                        <Input
                            id="number_of_guests"
                            type="number"
                            value={data.number_of_guests}
                            onChange={(e) => setData('number_of_guests', e.target.value)}
                            className={errors.number_of_guests ? 'border-red-500' : ''}
                        />
                        {errors.number_of_guests && <p className="text-red-500 text-sm">{errors.number_of_guests}</p>}
                    </div>

                    <div>
                        <Label htmlFor="number_of_bedrooms">Number of Bedrooms</Label>
                        <Input
                            id="number_of_bedrooms"
                            type="number"
                            value={data.number_of_bedrooms}
                            onChange={(e) => setData('number_of_bedrooms', e.target.value)}
                            className={errors.number_of_bedrooms ? 'border-red-500' : ''}
                        />
                        {errors.number_of_bedrooms && <p className="text-red-500 text-sm">{errors.number_of_bedrooms}</p>}
                    </div>

                    <div>
                        <Label htmlFor="number_of_beds">Number of Beds</Label>
                        <Input
                            id="number_of_beds"
                            type="number"
                            value={data.number_of_beds}
                            onChange={(e) => setData('number_of_beds', e.target.value)}
                            className={errors.number_of_beds ? 'border-red-500' : ''}
                        />
                        {errors.number_of_beds && <p className="text-red-500 text-sm">{errors.number_of_beds}</p>}
                    </div>

                    <div>
                        <Label htmlFor="number_of_bathrooms">Number of Bathrooms</Label>
                        <Input
                            id="number_of_bathrooms"
                            type="number"
                            value={data.number_of_bathrooms}
                            onChange={(e) => setData('number_of_bathrooms', e.target.value)}
                            className={errors.number_of_bathrooms ? 'border-red-500' : ''}
                        />
                        {errors.number_of_bathrooms && <p className="text-red-500 text-sm">{errors.number_of_bathrooms}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_available"
                            checked={data.is_available}
                            onCheckedChange={(checked) => setData('is_available', checked)}
                        />
                        <Label htmlFor="is_available">Is Available</Label>
                        {errors.is_available && <p className="text-red-500 text-sm">{errors.is_available}</p>}
                    </div>

                    <div>
                        <Label htmlFor="user_id">User ID (Host)</Label>
                        <Input
                            id="user_id"
                            type="number"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className={errors.user_id ? 'border-red-500' : ''}
                        />
                        {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Update Property</Button>
                </form>
            </div>
        </AppLayout>
    );
}
