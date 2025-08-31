import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { format } from 'date-fns';

interface Property {
    id: number;
    title: string;
    price_per_night: number;
    user_id: number;
}

interface PropertyBookingDemoProps {
    property: Property;
}

const PropertyBookingDemo: React.FC<PropertyBookingDemoProps> = ({ property }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');
    const [appliedCouponId, setAppliedCouponId] = useState<number | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        property_id: property.id,
        check_in_date: '',
        check_out_date: '',
        total_price: 0,
        status: 'pending',
        coupon_id: null,
    });

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            const start = new Date(checkInDate);
            const end = new Date(checkOutDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                const price = property.price_per_night * diffDays;
                setOriginalPrice(price);
                setDiscountedPrice(price);
                setDiscountAmount(0);
                setCouponMessage('');
                setAppliedCouponId(null);
                setData('total_price', price);
                setData('check_in_date', checkInDate);
                setData('check_out_date', checkOutDate);
            }
        }
    }, [checkInDate, checkOutDate, property.price_per_night]);

    const handleApplyCoupon = async () => {
        if (!couponCode || !checkInDate || !checkOutDate) {
            setCouponMessage('Please enter coupon code and select dates.');
            return;
        }

        try {
            const response = await axios.get(route('api.validate-coupon'), {
                params: {
                    coupon_code: couponCode,
                    property_id: property.id,
                    check_in_date: checkInDate,
                    check_out_date: checkOutDate,
                },
            });
            setDiscountedPrice(response.data.discounted_price);
            setDiscountAmount(response.data.discount_amount);
            setCouponMessage(response.data.message);
            setAppliedCouponId(response.data.coupon_id);
            setData('total_price', response.data.discounted_price);
            setData('coupon_id', response.data.coupon_id);
        } catch (error: any) {
            setDiscountedPrice(originalPrice);
            setDiscountAmount(0);
            setAppliedCouponId(null);
            setData('total_price', originalPrice);
            setData('coupon_id', null);
            setCouponMessage(error.response?.data?.message || 'Error applying coupon.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('customer.bookings.store'));
    };

    return (
        <AppLayout>
            <Head title={`Book ${property.title}`} />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Book {property.title}</h1>
                <p className="mb-4">Price per night: ${property.price_per_night}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="check_in_date">Check-in Date</Label>
                        <Input
                            type="date"
                            id="check_in_date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                        {errors.check_in_date && <div className="text-red-500 text-sm mt-1">{errors.check_in_date}</div>}
                    </div>

                    <div>
                        <Label htmlFor="check_out_date">Check-out Date</Label>
                        <Input
                            type="date"
                            id="check_out_date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                        {errors.check_out_date && <div className="text-red-500 text-sm mt-1">{errors.check_out_date}</div>}
                    </div>

                    {originalPrice > 0 && (
                        <div className="space-y-2">
                            <p>Original Price: ${originalPrice.toFixed(2)}</p>
                            {discountAmount > 0 && (
                                <p>Discount: -${discountAmount.toFixed(2)}</p>
                            )}
                            <p className="font-bold">Final Price: ${discountedPrice.toFixed(2)}</p>
                        </div>
                    )}

                    <div>
                        <Label htmlFor="coupon_code">Coupon Code</Label>
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                id="coupon_code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                            />
                            <Button type="button" onClick={handleApplyCoupon}>Apply</Button>
                        </div>
                        {couponMessage && <div className="text-sm mt-1">{couponMessage}</div>}
                        {errors.coupon_id && <div className="text-red-500 text-sm mt-1">{errors.coupon_id}</div>}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing || !checkInDate || !checkOutDate || originalPrice === 0}
                    >
                        Confirm Booking
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default PropertyBookingDemo;
