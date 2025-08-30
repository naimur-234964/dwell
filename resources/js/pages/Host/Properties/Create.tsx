import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Amenity } from '@/types';
import { useState } from 'react';
import ImageUpload from '@/components/image-upload';

export default function HostPropertyCreate({ amenities }: { amenities: Amenity[] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price_per_night: '',
        number_of_guests: '',
        number_of_bedrooms: '',
        number_of_beds: '',
        number_of_bathrooms: '',
        is_available: true,
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        amenities: [] as number[],
        images: [] as File[],
    });

    const [searchTerm, setSearchTerm] = useState('');

    const handleAmenityChange = (amenityId: number) => {
        const currentAmenities = data.amenities;
        if (currentAmenities.includes(amenityId)) {
            setData(
                'amenities',
                currentAmenities.filter((id) => id !== amenityId),
            );
        } else {
            setData('amenities', [...currentAmenities, amenityId]);
        }
    };

    const filteredAmenities = amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.properties.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Property" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Property (Host)</h1>
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

                    {/* Amenities */}
                    <div>
                        <Label htmlFor="amenities">Amenities</Label>
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                            {data.amenities.map((amenityId) => {
                                const amenity = amenities.find((a) => a.id === amenityId);
                                return (
                                    <div
                                        key={amenityId}
                                        className="flex items-center gap-2 bg-gray-200 rounded-md px-2 py-1"
                                    >
                                        <span>{amenity?.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleAmenityChange(amenityId)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                            <Input
                                id="amenities"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search amenities..."
                                className="border-0 focus:ring-0"
                            />
                        </div>
                        {searchTerm && (
                            <div className="border rounded-md mt-1">
                                {filteredAmenities.map((amenity) => (
                                    <div
                                        key={amenity.id}
                                        onClick={() => {
                                            handleAmenityChange(amenity.id);
                                            setSearchTerm('');
                                        }}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {amenity.name}
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.amenities && <p className="text-red-500 text-sm">{errors.amenities}</p>}
                    </div>

                    {/* Image Upload */}
                    <h2 className="text-xl font-bold mt-6 mb-4">Add Image</h2>
                    <div>
                        <ImageUpload onImagesChange={(images) => setData('images', images)} />
                        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                    </div>

                    {/* Address Fields */}
                    <h2 className="text-xl font-bold mt-6 mb-4">Address Details</h2>
                    <div>
                        <Label htmlFor="address_line_1">Address Line 1</Label>
                        <Input
                            id="address_line_1"
                            type="text"
                            value={data.address_line_1}
                            onChange={(e) => setData('address_line_1', e.target.value)}
                            className={errors.address_line_1 ? 'border-red-500' : ''}
                        />
                        {errors.address_line_1 && <p className="text-red-500 text-sm">{errors.address_line_1}</p>}
                    </div>
                    <div>
                        <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                        <Input
                            id="address_line_2"
                            type="text"
                            value={data.address_line_2}
                            onChange={(e) => setData('address_line_2', e.target.value)}
                            className={errors.address_line_2 ? 'border-red-500' : ''}
                        />
                        {errors.address_line_2 && <p className="text-red-500 text-sm">{errors.address_line_2}</p>}
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

                    <Button type="submit" disabled={processing}>Create Property</Button>
                </form>
            </div>
        </AppLayout>
    );
}