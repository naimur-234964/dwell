import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Address } from '@/types'; // Changed from Property to Address
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface HostAddressIndexProps { // Changed from HostPropertyIndexProps to HostAddressIndexProps
    addresses: { // Changed from properties to addresses
        data: Address[]; // Changed from Property[] to Address[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function HostAddressIndex({ addresses }: HostAddressIndexProps) { // Changed from HostPropertyIndex to HostAddressIndex and properties to addresses
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAddresses = addresses.data.filter(address => // Changed from filteredProperties to filteredAddresses and property to address
        // TODO: Customize search fields for Address model
        address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this address?')) { // Changed from property to address
            router.delete(`/host/addresses/${id}`); // Changed from /host/properties to /host/addresses
        }
    };

    return (
        <AppLayout>
            <Head title="My Addresses" /> {/* Changed from My Properties to My Addresses */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Addresses</h1> {/* Changed from My Properties to My Addresses */}
                    <Link href="/host/addresses/create"> {/* Changed from /host/properties/create to /host/addresses/create */}
                        <Button>Create Address</Button> {/* Changed from Create Property to Create Address */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search your addresses..." // Changed from Search your properties to Search your addresses
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredAddresses.length > 0 ? ( // Changed from filteredProperties to filteredAddresses
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for Address model */}
                                <TableHead>Street</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>State</TableHead>
                                <TableHead>Zip</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAddresses.map((address) => (
                                <TableRow key={address.id}>
                                    <TableCell>{address.id}</TableCell>
                                    {/* TODO: Customize table cells for Address model */}
                                    <TableCell>{address.street}</TableCell>
                                    <TableCell>{address.city}</TableCell>
                                    <TableCell>{address.state}</TableCell>
                                    <TableCell>{address.zip}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/host/addresses/${address.id}`}> {/* Changed from /host/properties to /host/addresses */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/host/addresses/${address.id}/edit`}> {/* Changed from /host/properties to /host/addresses */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(address.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No addresses found matching your search.</p> {/* Changed from No properties to No addresses */}
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {addresses.from} to {addresses.to} of {addresses.total} entries {/* Changed from properties to addresses */}
                    </div>
                    <div className="flex gap-2">
                        {addresses.links.map((link, index) => ( {/* Changed from properties to addresses */}
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
