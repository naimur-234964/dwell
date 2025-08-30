import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { Checkbox } from '@/components/ui/checkbox'; // Removed if not used
import { type Review } from '@/types'; // Changed from Property, Amenity, PropertyImage
// import { useState } from 'react'; // Removed if not used
// import ImageUpload from '@/components/image-upload'; // Removed as Review does not have images
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminReviewEditProps { // Changed from AdminPropertyEditProps
    review: Review; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminReviewEdit({ review }: AdminReviewEditProps) { // Changed from AdminPropertyEdit and removed amenities prop
    const { data, setData, post, processing, errors } = useForm({
        // TODO: Customize form fields for Review model
        property_id: review.property_id,
        user_id: review.user_id,
        rating: review.rating,
        comment: review.comment,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.reviews.update', review.id)); // Changed from admin.properties.update to admin.reviews.update
    };

    return (
        <AppLayout>
            <Head title={`Edit Review: ${review.id}`} /> {/* Changed from Edit Property: ${property.title} to Edit Review: ${review.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Edit Review (Admin)</CardTitle> {/* Changed from Edit Property to Edit Review */}
                        <CardDescription>Editing: {review.id}</CardDescription> {/* Changed from Editing: ${property.title} to Editing: ${review.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/reviews"> {/* Changed from /admin/properties to /admin/reviews */}
                                <Button variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
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

                            <Button type="submit" disabled={processing}>Update Review</Button> {/* Changed from Update Property to Update Review */}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
