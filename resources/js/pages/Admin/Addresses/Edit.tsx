import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea'; // Removed if not used
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type Address } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Address does not have images
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminAddressEditProps { // Changed from AdminPropertyEditProps
    address: Address; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminAddressEdit({ address }: AdminAddressEditProps) { // Changed from AdminPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Address model
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        country: address.country,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.addresses.update', address.id)); // Changed from admin.properties.update to admin.addresses.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Address: ${address.street}`} /> {/* Changed from Edit Property: ${property.title} to Edit Address: ${address.street} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Address (Admin)</CardTitle> {/* Changed from Edit Property to Edit Address */}
                        <CardDescription>Editing: {address.street}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${address.street} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/addresses"> {/* Changed from /admin/properties to /admin/addresses */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
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

                            <Button type="submit" disabled={processing}>Update Address</Button> {/* Changed from Update Property to Update Address */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
