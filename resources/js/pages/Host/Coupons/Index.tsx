import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';

interface Coupon {
    id: number;
    code: string;
    type: string;
    value: number;
    starts_at: string | null;
    expires_at: string | null;
    usage_limit: number | null;
    used_count: number;
    min_cart_value: number | null;
    status: string;
    user_id: number | null;
    created_at: string;
    updated_at: string;
}

interface HostCouponIndexProps {
    coupons: {
        data: Coupon[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

const Index: React.FC<HostCouponIndexProps> = ({ coupons }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCoupons = coupons.data.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            router.delete(route('host.coupons.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Host Coupons" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Host Coupons</h1>
                    <Link href={route('host.coupons.create')}>
                        <Button>Create Coupon</Button>
                    </Link>
                </div>

                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Search coupons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredCoupons.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Starts At</TableHead>
                                <TableHead>Expires At</TableHead>
                                <TableHead>Usage Limit</TableHead>
                                <TableHead>Used Count</TableHead>
                                <TableHead>Min Cart Value</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCoupons.map((coupon) => (
                                <TableRow key={coupon.id}>
                                    <TableCell>{coupon.code}</TableCell>
                                    <TableCell>{coupon.type}</TableCell>
                                    <TableCell>{coupon.value}</TableCell>
                                    <TableCell>{coupon.starts_at ? new Date(coupon.starts_at).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>{coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>{coupon.usage_limit || 'Unlimited'}</TableCell>
                                    <TableCell>{coupon.used_count}</TableCell>
                                    <TableCell>{coupon.min_cart_value || 'N/A'}</TableCell>
                                    <TableCell>{coupon.status}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link href={route('host.coupons.show', coupon.id)}>
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        </Link>
                                        <Link href={route('host.coupons.edit', coupon.id)}>
                                            <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(coupon.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No coupons found matching your search.</p>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Showing {coupons.from} to {coupons.to} of {coupons.total} entries
                    </div>
                    <div className="flex gap-2">
                        {coupons.links.map((link, index) => (
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
};

export default Index;