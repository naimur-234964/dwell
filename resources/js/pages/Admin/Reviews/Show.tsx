import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type Review } from '@/types'; // Changed from Property, Amenity, Address
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminReviewShowProps { // Changed from AdminPropertyShowProps
    review: Review; // Changed from property: Property & { address: Address; amenities: Amenity[]; property_images: PropertyImage[] };
}

export default function AdminReviewShow({ review }: AdminReviewShowProps) { // Changed from AdminPropertyShow
    return (
        <AppLayout>
            <Head title={`Review: ${review.id}`} /> {/* Changed from Property: ${property.title} to Review: ${review.id} */}
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Review Details (Admin)</CardTitle> {/* Changed from Property Details to Review Details */}
                        <CardDescription>Information about Review ID: {review.id}</CardDescription> {/* Changed from Information about ${property.title} to Information about Review ID: ${review.id} */}
                        <div className="absolute top-4 right-4">
                            <Link href="/admin/reviews"> {/* Changed from /admin/properties to /admin/reviews */}
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Review Information</h3> {/* Changed from General Information to Review Information */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                {/* TODO: Customize display fields for Review model */}
                                <p className="col-span-1"><strong>Property ID:</strong></p><p className="col-span-3">{review.property_id}</p>
                                <p className="col-span-1"><strong>User ID:</strong></p><p className="col-span-3">{review.user_id}</p>
                                <p className="col-span-1"><strong>Rating:</strong></p><p className="col-span-3">{review.rating}</p>
                                <p className="col-span-1"><strong>Comment:</strong></p><p className="col-span-3">{review.comment}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Review ID:</strong></p><p className="col-span-3">{review.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
