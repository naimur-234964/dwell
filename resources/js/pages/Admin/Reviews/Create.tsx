import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
// import { Amenity } from '@/types'; // Removed as Review does not have amenities
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Review does not have images

export default function AdminReviewCreate() { // Changed from AdminPropertyCreate and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Review model
        property_id: '',
        user_id: '',
        rating: '',
        comment: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.reviews.store')); // Changed from admin.properties.store to admin.reviews.store
    };

    return (
        <AppLayout>
            <Head title="Create Review" /> {/* Changed from Create Property to Create Review */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create New Review (Admin)</h1> {/* Changed from Create New Property to Create New Review */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TODO: Customize form fields for Review model */}
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

                    <div>
                        <Label htmlFor="user_id">User ID</Label>
                        <Input
                            id="user_id"
                            type="number"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className={errors.user_id ? 'border-red-500' : ''}
                        />
                        {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                    </div>

                    <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                            id="rating"
                            type="number"
                            step="0.01"
                            value={data.rating}
                            onChange={(e) => setData('rating', e.target.value)}
                            className={errors.rating ? 'border-red-500' : ''}
                        />
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>

                    <div>
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            className={errors.comment ? 'border-red-500' : ''}
                        />
                        {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>Create Review</Button> {/* Changed from Create Property to Create Review */}
                </form>
            </div>
        </AppLayout>
    );
}
