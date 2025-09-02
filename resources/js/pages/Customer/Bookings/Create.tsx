import { type SharedData, type Property } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { FormEventHandler, useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface CreateBookingPageProps extends SharedData {
    property: Property;
}

export default function Create() {
    const { property } = usePage<CreateBookingPageProps>().props;
    const [numberOfNights, setNumberOfNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [advancePayment, setAdvancePayment] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        property_id: property.id,
        check_in_date: '',
        check_out_date: '',
        number_of_guests: 1,
        phone_no: '',
        total_price: 0,
        advance_payment_amount: 0,
        advance_payment_status: 'pending',
        status: 'pending',
        coupon_id: null as number | null,
    });

    useEffect(() => {
        if (data.check_in_date && data.check_out_date) {
            const checkIn = dayjs(data.check_in_date);
            const checkOut = dayjs(data.check_out_date);
            if (checkOut.isAfter(checkIn)) {
                const nights = checkOut.diff(checkIn, 'day');
                setNumberOfNights(nights);
                const price = (property.discount_price || property.price_per_night) * nights;
                const finalPrice = price - discountAmount;
                const calculatedAdvancePayment = finalPrice * 0.10;
                setTotalPrice(finalPrice);
                setAdvancePayment(calculatedAdvancePayment);
                setData('total_price', finalPrice);
                setData('advance_payment_amount', calculatedAdvancePayment);
            } else {
                setNumberOfNights(0);
                setTotalPrice(0);
                setAdvancePayment(0);
                setData('total_price', 0);
                setData('advance_payment_amount', 0);
            }
        } else {
            setNumberOfNights(0);
            setTotalPrice(0);
            setAdvancePayment(0);
            setData('total_price', 0);
            setData('advance_payment_amount', 0);
        }
    }, [data.check_in_date, data.check_out_date, property.price_per_night, property.discount_price, discountAmount]);

    useEffect(() => {
        setData('phone_no', phoneNo);
    }, [phoneNo]);

    const applyCoupon = async () => {
        if (!data.check_in_date || !data.check_out_date) {
            setCouponError('Please select check-in and check-out dates first.');
            return;
        }

        setCouponError('');
        setCouponSuccess('');
        setDiscountAmount(0);
        setData('coupon_id', null);

        try {
            const response = await fetch('/api/validate-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    coupon_code: couponCode,
                    property_id: property.id,
                    check_in_date: data.check_in_date,
                    check_out_date: data.check_out_date,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setDiscountAmount(result.discount_amount);
                setData('coupon_id', result.coupon_id);
                setCouponSuccess(result.message);
            } else {
                try {
                    const result = await response.json();
                    setCouponError(result.message || 'An error occurred.');
                } catch (e) {
                    setCouponError(`Server error: ${response.status} ${response.statusText}`);
                }
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            setCouponError('An unexpected error occurred. Please check your network connection.');
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('customer.bookings.store'));
    };

    return (
        <StorefrontLayout>
            <Head title={`Book ${property.title}`} />
            <div className="container max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                        <p className="text-lg text-gray-600 mb-4">{property.address.city}, {property.address.country}</p>
                        {property.image_path && (
                            <img src={property.image_path} alt={property.title} className="w-full h-auto rounded-lg shadow-md" />
                        )}
                    </div>
                    <div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Your trip</h2>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="check_in_date" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                        <input
                                            type="date"
                                            id="check_in_date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                            value={data.check_in_date}
                                            onChange={(e) => setData('check_in_date', e.target.value)}
                                            required
                                        />
                                        {errors.check_in_date && <p className="text-red-500 text-sm mt-2">{errors.check_in_date}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="check_out_date" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                        <input
                                            type="date"
                                            id="check_out_date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                            value={data.check_out_date}
                                            onChange={(e) => setData('check_out_date', e.target.value)}
                                            required
                                        />
                                        {errors.check_out_date && <p className="text-red-500 text-sm mt-2">{errors.check_out_date}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="number_of_guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                    <input
                                        type="number"
                                        id="number_of_guests"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                        value={data.number_of_guests}
                                        onChange={(e) => setData('number_of_guests', parseInt(e.target.value))}
                                        min="1"
                                        max={property.number_of_guests}
                                        required
                                    />
                                    {errors.number_of_guests && <p className="text-red-500 text-sm mt-2">{errors.number_of_guests}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone_no"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                    />
                                    {errors.phone_no && <p className="text-red-500 text-sm mt-2">{errors.phone_no}</p>}
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-grow">
                                        <label htmlFor="coupon_code" className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                                        <input
                                            type="text"
                                            id="coupon_code"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={applyCoupon}
                                        className="self-end bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                                {couponSuccess && <p className="text-green-500 text-sm mt-2">{couponSuccess}</p>}
                                <hr className="my-6" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Price details</h3>
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-gray-600">Subtotal</p>
                                        <p className="font-semibold">${((property.discount_price || property.price_per_night) * numberOfNights).toFixed(2)}</p>
                                    </div>
                                    {discountAmount > 0 && (
                                        <div className="flex justify-between items-center mb-3 text-green-600">
                                            <p>Coupon Discount</p>
                                            <p className="font-semibold">-${discountAmount.toFixed(2)}</p>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center font-bold text-lg pt-4 border-t">
                                        <p>Total (USD)</p>
                                        <p>${totalPrice.toFixed(2)}</p>
                                    </div>
                                    {advancePayment > 0 && (
                                        <div className="flex justify-between items-center font-bold text-lg pt-2">
                                            <p className="text-green-600">Advance Payment (10%)</p>
                                            <p className="text-green-600">${advancePayment.toFixed(2)}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        disabled={processing || numberOfNights <= 0}
                                    >
                                        Confirm booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}
