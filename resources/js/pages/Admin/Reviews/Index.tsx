import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Review } from '@/types'; // Changed from Property to Review
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface AdminReviewIndexProps { // Changed from AdminPropertyIndexProps to AdminReviewIndexProps
    reviews: { // Changed from properties to reviews
        data: Review[]; // Changed from Property[] to Review[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function AdminReviewIndex({ reviews }: AdminReviewIndexProps) { // Changed from AdminPropertyIndex to AdminReviewIndex and properties to reviews
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReviews = reviews.data.filter(review => // Changed from filteredProperties to filteredReviews and property to review
        // TODO: Customize search fields for Review model
        (review.id?.toString() || '').includes(searchTerm.toLowerCase()) ||
        (review.comment?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this review?')) { // Changed from property to review
            router.delete(`/admin/reviews/${id}`); // Changed from /admin/properties to /admin/reviews
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Reviews" /> {/* Changed from Admin Properties to Admin Reviews */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin Reviews</h1> {/* Changed from Admin Properties to Admin Reviews */}
                    <Link href="/admin/reviews/create"> {/* Changed from /admin/properties/create to /admin/reviews/create */}
                        <Button>Create Review</Button> {/* Changed from Create Property to Create Review */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search reviews..." // Changed from Search properties to Search reviews
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredReviews.length > 0 ? ( // Changed from filteredProperties to filteredReviews
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for Review model */}
                                <TableHead>Property ID</TableHead>
                                <TableHead>User ID</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{review.id}</TableCell>
                                    {/* TODO: Customize table cells for Review model */}
                                    <TableCell>{review.property_id}</TableCell>
                                    <TableCell>{review.user_id}</TableCell>
                                    <TableCell>{review.rating}</TableCell>
                                    <TableCell>{review.comment}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/admin/reviews/${review.id}`}> {/* Changed from /admin/properties to /admin/reviews */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/admin/reviews/${review.id}/edit`}> {/* Changed from /admin/properties to /admin/reviews */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No reviews found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {reviews.from} to {reviews.to} of {reviews.total} entries {/* Changed from properties to reviews */}
                    </div>
                    <div className="flex gap-2">
                        {reviews.links.map((link, index) => (
                            <>
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 border rounded-md ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    preserveScroll
                                >
                                    {link.label.replace(/&laquo;|&raquo;/g, '')}
                                </Link>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
