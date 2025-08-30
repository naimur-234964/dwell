import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Amenity } from '@/types'; // Changed from Property, Amenity, PropertyImage
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminAmenityEditProps { // Changed from AdminPropertyEditProps
    amenity: Amenity; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminAmenityEdit({ amenity }: AdminAmenityEditProps) { // Changed from AdminPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Amenity model
        name: amenity.name,
        description: amenity.description,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.amenities.update', amenity.id)); // Changed from admin.properties.update to admin.amenities.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Amenity: ${amenity.name}`} /> {/* Changed from Edit Property: ${property.title} to Edit Amenity: ${amenity.name} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Amenity (Admin)</CardTitle> {/* Changed from Edit Property to Edit Amenity */}
                        <CardDescription>Editing: {amenity.name}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${amenity.name} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/amenities"> {/* Changed from /admin/properties to /admin/amenities */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* TODO: Customize form fields for Amenity model */}
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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

                            <Button type="submit" disabled={processing}>Update Amenity</Button> {/* Changed from Update Property to Update Amenity */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
