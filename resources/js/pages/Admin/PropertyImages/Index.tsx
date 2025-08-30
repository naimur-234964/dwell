import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type PropertyImage } from '@/types'; // Changed from Property to PropertyImage
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface AdminPropertyImageIndexProps { // Changed from AdminPropertyIndexProps to AdminPropertyImageIndexProps
    propertyImages: { // Changed from properties to propertyImages
        data: PropertyImage[]; // Changed from Property[] to PropertyImage[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function AdminPropertyImageIndex({ propertyImages }: AdminPropertyImageIndexProps) { // Changed from AdminPropertyIndex to AdminPropertyImageIndex and properties to propertyImages
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPropertyImages = propertyImages.data.filter(propertyImage => // Changed from filteredProperties to filteredPropertyImages and property to propertyImage
        // TODO: Customize search fields for PropertyImage model
        (propertyImage.id?.toString() || '').includes(searchTerm.toLowerCase()) ||
        (propertyImage.image_path?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this property image?')) { // Changed from property to property image
            router.delete(`/admin/property-images/${id}`); // Changed from /admin/properties to /admin/property-images
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Property Images" /> {/* Changed from Admin Properties to Admin Property Images */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin Property Images</h1> {/* Changed from Admin Properties to Admin Property Images */}
                    <Link href="/admin/property-images/create"> {/* Changed from /admin/properties/create to /admin/property-images/create */}
                        <Button>Create Property Image</Button> {/* Changed from Create Property to Create Property Image */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search property images..." // Changed from Search properties to Search property images
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredPropertyImages.length > 0 ? ( // Changed from filteredProperties to filteredPropertyImages
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for PropertyImage model */}
                                <TableHead>Property ID</TableHead>
                                <TableHead>Image Path</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPropertyImages.map((propertyImage) => (
                                <TableRow key={propertyImage.id}>
                                    <TableCell>{propertyImage.id}</TableCell>
                                    {/* TODO: Customize table cells for PropertyImage model */}
                                    <TableCell>{propertyImage.property_id}</TableCell>
                                    <TableCell>{propertyImage.image_path}</TableCell>
                                    <TableCell>{propertyImage.order}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/admin/property-images/${propertyImage.id}`}> {/* Changed from /admin/properties to /admin/property-images */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/admin/property-images/${propertyImage.id}/edit`}> {/* Changed from /admin/properties to /admin/property-images */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(propertyImage.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No property images found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {propertyImages.from} to {propertyImages.to} of {propertyImages.total} entries {/* Changed from properties to propertyImages */}
                    </div>
                    <div className="flex gap-2">
                        {propertyImages.links.map((link, index) => (
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
