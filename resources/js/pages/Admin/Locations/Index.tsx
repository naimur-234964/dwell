import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Location } from '@/types'; // Assuming a Location type will be defined
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface AdminLocationIndexProps {
    locations: {
        data: Location[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function AdminLocationIndex({ locations }: AdminLocationIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLocations = locations.data.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this location?')) {
            router.delete(`/admin/locations/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Admin Locations" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin Locations</h1>
                    <Link href="/admin/locations/create">
                        <Button>Create Location</Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredLocations.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLocations.map((location) => (
                                <TableRow key={location.id}>
                                    <TableCell>{location.id}</TableCell>
                                    <TableCell>{location.name}</TableCell>
                                    <TableCell>
                                        {location.image_path && (
                                            <img src={`/storage/${location.image_path}`} alt={location.name} className="w-16 h-16 object-cover rounded" />
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/admin/locations/${location.id}`}>
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/admin/locations/${location.id}/edit`}>
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(location.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No locations found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {locations.from} to {locations.to} of {locations.total} entries
                    </div>
                    <div className="flex gap-2">
                        {locations.links.map((link, index) => (
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