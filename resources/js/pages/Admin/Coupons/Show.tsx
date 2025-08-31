import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

interface AdminCouponShowProps {
    coupon: Coupon;
}

const Show: React.FC<AdminCouponShowProps> = ({ coupon }) => {
    return (
        <AppLayout>
            <Head title={`Coupon: ${coupon.code}`} />
            <div className="p-4">
                <Card>
                    <CardHeader className="relative">
                        <CardTitle>Coupon Details: {coupon.code}</CardTitle>
                        <div className="absolute top-4 right-4">
                            <Link href={route('admin.coupons.index')}>
                                <Button variant="outline">Back to List</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">General Information</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Code:</strong></p><p className="col-span-3">{coupon.code}</p>
                                <p className="col-span-1"><strong>Type:</strong></p><p className="col-span-3">{coupon.type}</p>
                                <p className="col-span-1"><strong>Value:</strong></p><p className="col-span-3">{coupon.value}</p>
                                <p className="col-span-1"><strong>Starts At:</strong></p><p className="col-span-3">{coupon.starts_at ? new Date(coupon.starts_at).toLocaleDateString() : 'N/A'}</p>
                                <p className="col-span-1"><strong>Expires At:</strong></p><p className="col-span-3">{coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'N/A'}</p>
                                <p className="col-span-1"><strong>Usage Limit:</strong></p><p className="col-span-3">{coupon.usage_limit || 'Unlimited'}</p>
                                <p className="col-span-1"><strong>Used Count:</strong></p><p className="col-span-3">{coupon.used_count}</p>
                                <p className="col-span-1"><strong>Min Cart Value:</strong></p><p className="col-span-3">{coupon.min_cart_value || 'N/A'}</p>
                                <p className="col-span-1"><strong>Status:</strong></p><p className="col-span-3">{coupon.status}</p>
                                <p className="col-span-1"><strong>User ID:</strong></p><p className="col-span-3">{coupon.user_id || 'N/A'}</p>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Timestamps</h3>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                                <p className="col-span-1"><strong>Created At:</strong></p><p className="col-span-3">{new Date(coupon.created_at).toLocaleString()}</p>
                                <p className="col-span-1"><strong>Updated At:</strong></p><p className="col-span-3">{new Date(coupon.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Show;