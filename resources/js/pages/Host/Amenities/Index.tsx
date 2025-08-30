import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Amenity } from '@/types'; // Changed from Property to Amenity
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface HostAmenityIndexProps { // Changed from HostPropertyIndexProps to HostAmenityIndexProps
    amenities: { // Changed from properties to amenities
        data: Amenity[]; // Changed from Property[] to Amenity[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function HostAmenityIndex({ amenities }: HostAmenityIndexProps) { // Changed from HostPropertyIndex to HostAmenityIndex and properties to amenities
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAmenities = amenities.data.filter(amenity => // Changed from filteredProperties to filteredAmenities and property to amenity
        // TODO: Customize search fields for Amenity model
        (amenity.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (amenity.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this amenity?')) { // Changed from property to amenity
            router.delete(`/host/amenities/${id}`); // Changed from /host/properties to /host/amenities
        }
    };

    return (
        <AppLayout>
            <Head title="My Amenities" /> {/* Changed from My Properties to My Amenities */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Amenities</h1> {/* Changed from My Properties to My Amenities */}
                    <Link href="/host/amenities/create"> {/* Changed from /host/properties/create to /host/amenities/create */}
                        <Button>Create Amenity</Button> {/* Changed from Create Property to Create Amenity */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search your amenities..." // Changed from Search your properties to Search your amenities
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredAmenities.length > 0 ? ( // Changed from filteredProperties to filteredAmenities
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for Amenity model */}
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAmenities.map((amenity) => (
                                <TableRow key={amenity.id}>
                                    <TableCell>{amenity.id}</TableCell>
                                    {/* TODO: Customize table cells for Amenity model */}
                                    <TableCell>{amenity.name}</TableCell>
                                    <TableCell>{amenity.description}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/host/amenities/${amenity.id}`}> {/* Changed from /host/properties to /host/amenities */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                                                                </Link>
                                        <Link href={`/host/amenities/${amenity.id}/edit`}> {/* Changed from /host/properties to /host/amenities */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(amenity.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No amenities found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {amenities.from} to {amenities.to} of {amenities.total} entries {/* Changed from properties to amenities */}
                    </div>
                    <div className="flex gap-2">
                        {amenities.links.map((link, index) => (
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
