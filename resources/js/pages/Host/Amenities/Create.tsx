import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function HostAmenityCreate() { // Changed from HostPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Amenity model
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.amenities.store')); // Changed from host.properties.store to host.amenities.store
    };

    return (
        <AppLayout>
            <Head title="Create Amenity" /> {/* Changed from Create Property to Create Amenity */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Amenity (Host)</h1> {/* Changed from Create New Property to Create New Amenity */}
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

                    <Button type="submit" disabled={processing}>Create Amenity</Button> {/* Changed from Create Property to Create Amenity */}
                </form>
            </div>
        </AppLayout>
    );
}
