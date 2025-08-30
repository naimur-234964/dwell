import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/image-upload'; // Assuming this component can handle single image upload

export default function AdminLocationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null as File | null, // For single image upload
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.locations.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Location" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Location</h1>
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
                        <ImageUpload
                            onImagesChange={(images) => setData('image', images[0] || null)} // Assuming single image for location
                            // You might need to adjust ImageUpload component to handle single file or provide a specific prop
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Create Location</Button>
                </form>
            </div>
        </AppLayout>
    );
}