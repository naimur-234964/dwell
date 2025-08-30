import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Property } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface HostPropertyIndexProps {
    properties: {
        data: Property[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function HostPropertyIndex({ properties }: HostPropertyIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = properties.data.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this property?')) {
            router.delete(`/host/properties/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="My Properties" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Properties</h1>
                    <Link href="/host/properties/create">
                        <Button>Create Property</Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search your properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredProperties.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Price/Night</TableHead>
                                <TableHead>Guests</TableHead>
                                <TableHead>Bedrooms</TableHead>
                                <TableHead>Beds</TableHead>
                                <TableHead>Bathrooms</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProperties.map((property) => (
                                <TableRow key={property.id}>
                                    <TableCell>{property.id}</TableCell>
                                    <TableCell>{property.title}</TableCell>
                                    <TableCell>${property.price_per_night}</TableCell>
                                    <TableCell>{property.number_of_guests}</TableCell>
                                    <TableCell>{property.number_of_bedrooms}</TableCell>
                                    <TableCell>{property.number_of_beds}</TableCell>
                                    <TableCell>{property.number_of_bathrooms}</TableCell>
                                    <TableCell>{property.is_available ? 'Yes' : 'No'}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/host/properties/${property.id}`}>
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/host/properties/${property.id}/edit`}>
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(property.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No properties found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {properties.from} to {properties.to} of {properties.total} entries
                    </div>
                    <div className="flex gap-2">
                        {properties.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 border rounded-md ${link.active ? 'bg-blue-500 text-white' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                preserveScroll
                            >
                                {link.label.replace(/&laquo;|&raquo;/g, '')}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
