import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Create: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        type: 'percentage',
        value: 0,
        starts_at: '',
        expires_at: '',
        usage_limit: '',
        min_cart_value: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('host.coupons.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Host Coupon" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Create Host Coupon</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <Label htmlFor="code">Code</Label>
                            <Input
                                type="text"
                                id="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                            />
                            {errors.code && <div className="text-red-500 text-sm mt-1">{errors.code}</div>}
                        </div>

                        <div>
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(value) => setData('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                        </div>

                        <div>
                            <Label htmlFor="value">Value</Label>
                            <Input
                                type="number"
                                id="value"
                                value={data.value}
                                onChange={(e) => setData('value', parseFloat(e.target.value))}
                            />
                            {errors.value && <div className="text-red-500 text-sm mt-1">{errors.value}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="starts_at">Starts At</Label>
                            <Input
                                type="date"
                                id="starts_at"
                                value={data.starts_at}
                                onChange={(e) => setData('starts_at', e.target.value)}
                            />
                            {errors.starts_at && <div className="text-red-500 text-sm mt-1">{errors.starts_at}</div>}
                        </div>

                        <div>
                            <Label htmlFor="expires_at">Expires At</Label>
                            <Input
                                type="date"
                                id="expires_at"
                                value={data.expires_at}
                                onChange={(e) => setData('expires_at', e.target.value)}
                            />
                            {errors.expires_at && <div className="text-red-500 text-sm mt-1">{errors.expires_at}</div>}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <Label htmlFor="usage_limit">Usage Limit</Label>
                            <Input
                                type="number"
                                id="usage_limit"
                                value={data.usage_limit}
                                onChange={(e) => setData('usage_limit', parseInt(e.target.value))}
                            />
                            {errors.usage_limit && <div className="text-red-500 text-sm mt-1">{errors.usage_limit}</div>}
                        </div>

                        <div>
                            <Label htmlFor="min_cart_value">Minimum Cart Value</Label>
                            <Input
                                type="number"
                                id="min_cart_value"
                                value={data.min_cart_value}
                                onChange={(e) => setData('min_cart_value', parseFloat(e.target.value))}
                            />
                            {errors.min_cart_value && <div className="text-red-500 text-sm mt-1">{errors.min_cart_value}</div>}
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                    >
                        Create Coupon
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;