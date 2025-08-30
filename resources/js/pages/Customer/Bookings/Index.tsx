import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Booking } from '@/types'; // Changed from Property to Booking
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface CustomerBookingIndexProps { // Changed from HostPropertyIndexProps to CustomerBookingIndexProps
    bookings: { // Changed from properties to bookings
        data: Booking[]; // Changed from Property[] to Booking[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function CustomerBookingIndex({ bookings }: CustomerBookingIndexProps) { // Changed from HostPropertyIndex to CustomerBookingIndex and properties to bookings
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBookings = bookings.data.filter(booking => // Changed from filteredProperties to filteredBookings and property to booking
        // TODO: Customize search fields for Booking model
        booking.id.toString().includes(searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this booking?')) { // Changed from property to booking
            router.delete(`/customer/bookings/${id}`); // Changed from /host/properties to /customer/bookings
        }
    };

    return (
        <AppLayout>
            <Head title="My Bookings" /> {/* Changed from My Properties to My Bookings */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Bookings</h1> {/* Changed from My Properties to My Bookings */}
                    <Link href="/customer/bookings/create"> {/* Changed from /host/properties/create to /customer/bookings/create */}
                        <Button>Create Booking</Button> {/* Changed from Create Property to Create Booking */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search your bookings..." // Changed from Search your properties to Search your bookings
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredBookings.length > 0 ? ( // Changed from filteredProperties to filteredBookings
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for Booking model */}
                                <TableHead>Property ID</TableHead>
                                <TableHead>User ID</TableHead>
                                <TableHead>Check-in Date</TableHead>
                                <TableHead>Check-out Date</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.id}</TableCell>
                                    {/* TODO: Customize table cells for Booking model */}
                                    <TableCell>{booking.property_id}</TableCell>
                                    <TableCell>{booking.user_id}</TableCell>
                                    <TableCell>{booking.check_in_date}</TableCell>
                                    <TableCell>{booking.check_out_date}</TableCell>
                                    <TableCell>${booking.total_price}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/customer/bookings/${booking.id}`}> {/* Changed from /host/properties to /customer/bookings */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/customer/bookings/${booking.id}/edit`}> {/* Changed from /host/properties to /customer/bookings */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(booking.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No bookings found matching your search.</p> {/* Changed from No properties to No bookings */}
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {bookings.from} to {bookings.to} of {bookings.total} entries {/* Changed from properties to bookings */}
                    </div>
                    <div className="flex gap-2">
                        {bookings.links.map((link, index) => ( {/* Changed from properties to bookings */}
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
