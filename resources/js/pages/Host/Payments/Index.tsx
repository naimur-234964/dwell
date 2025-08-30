import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type Payment } from '@/types'; // Changed from Property to Payment
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

interface HostPaymentIndexProps { // Changed from HostPropertyIndexProps to HostPaymentIndexProps
    payments: { // Changed from properties to payments
        data: Payment[]; // Changed from Property[] to Payment[]
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export default function HostPaymentIndex({ payments }: HostPaymentIndexProps) { // Changed from HostPropertyIndex to HostPaymentIndex and properties to payments
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPayments = payments.data.filter(payment => // Changed from filteredProperties to filteredPayments and property to payment
        // TODO: Customize search fields for Payment model
        (payment.id?.toString() || '').includes(searchTerm.toLowerCase()) ||
        (payment.amount?.toString() || '').includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this payment?')) { // Changed from property to payment
            router.delete(`/host/payments/${id}`); // Changed from /host/properties to /host/payments
        }
    };

    return (
        <AppLayout>
            <Head title="My Payments" /> {/* Changed from My Properties to My Payments */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">My Payments</h1> {/* Changed from My Properties to My Payments */}
                    <Link href="/host/payments/create"> {/* Changed from /host/properties/create to /host/payments/create */}
                        <Button>Create Payment</Button> {/* Changed from Create Property to Create Payment */}
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search your payments..." // Changed from Search your properties to Search your payments
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredPayments.length > 0 ? ( // Changed from filteredProperties to filteredPayments
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* TODO: Customize table headers for Payment model */}
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.id}</TableCell>
                                    {/* TODO: Customize table cells for Payment model */}
                                    <TableCell>{payment.booking_id}</TableCell>
                                    <TableCell>${payment.amount}</TableCell>
                                    <TableCell>{payment.payment_method}</TableCell>
                                    <TableCell>{payment.status}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={`/host/payments/${payment.id}`}> {/* Changed from /host/properties to /host/payments */}
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={`/host/payments/${payment.id}/edit`}> {/* Changed from /host/properties to /host/payments */}
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No payments found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {payments.from} to {payments.to} of {payments.total} entries {/* Changed from properties to payments */}
                    </div>
                    <div className="flex gap-2">
                        {payments.links.map((link, index) => (
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
