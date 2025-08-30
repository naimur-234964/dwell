import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/image-upload'; // Assuming this component can handle single image upload
import { Location } from '@/types'; // Import Location type
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react'; // Import Link for Cancel button

interface AdminLocationEditProps {
    location: Location;
}

export default function AdminLocationEdit({ location }: AdminLocationEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: location.name,
        image: null as File | null, // For new image upload
        existing_image_path: location.image_path, // To display current image
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.locations.update', location.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Location: ${location.name}`} />
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Location</CardTitle>
                        <CardDescription>Editing: {location.name}</CardDescription>
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/locations">
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Location Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* Image Upload */}
                            <div>
                                <Label htmlFor="image">Location Image</Label>
                                {data.existing_image_path && (
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">Current Image:</p>
                                        <img src={`/storage/${data.existing_image_path}`} alt={location.name} className="w-32 h-32 object-cover rounded" />
                                    </div>
                                )}
                                <ImageUpload
                                    onImagesChange={(images) => setData('image', images[0] || null)}
                                    // You might need to adjust ImageUpload component to handle single file or provide a specific prop
                                />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>Update Location</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}