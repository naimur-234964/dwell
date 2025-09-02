import { type SharedData, type Booking } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';
import { Link } from '@inertiajs/react';

interface ShowBookingPageProps extends SharedData {
    booking: Booking;
}

export default function Show() {
    const { booking } = usePage<ShowBookingPageProps>().props;

    return (
        <StorefrontLayout>
            <Head title={`Booking ${booking.id} Details`} />
            <div className="container max-w-4xl mx-auto px-6 py-10 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

                    <div className="mt-8 text-left inline-block">
                        <h2 className="text-xl font-semibold mb-2">Property Information:</h2>
                        <p className="text-gray-600"><strong>Title:</strong> {booking.property?.title || 'N/A'}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {booking.property?.address?.street_address || 'N/A'}, {booking.property?.address?.city || 'N/A'}, {booking.property?.address?.country || 'N/A'}</p>

                        <h2 className="text-xl font-semibold mt-6 mb-2">Booking Details:</h2>
                        <p className="text-gray-600"><strong>Booked by:</strong> {booking.customer?.name || 'N/A'}</p>
                        <p className="text-gray-600"><strong>Check-in Date:</strong> {booking.check_in_date}</p>
                        <p className="text-gray-600"><strong>Check-out Date:</strong> {booking.check_out_date}</p>
                        <p className="text-gray-600"><strong>Total Price:</strong> ${parseFloat(booking.total_price).toFixed(2)}</p>
                        <p className="text-gray-600"><strong>Booking Status:</strong> {booking.status}</p>
                        <p className="text-gray-600"><strong>Phone Number:</strong> {booking.phone_no || 'N/A'}</p>

                        {booking.payments && booking.payments.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-2">Payment Information:</h2>
                                {booking.payments.map((payment) => (
                                    <div key={payment.id} className="border-t border-gray-200 pt-4 mt-4">
                                        <p className="text-gray-600"><strong>Payment ID:</strong> {payment.id}</p>
                                        <p className="text-gray-600"><strong>Amount:</strong> ${parseFloat(payment.amount).toFixed(2)}</p>
                                        <p className="text-gray-600"><strong>Advance Amount:</strong> ${parseFloat(payment.advance_amount).toFixed(2)}</p>
                                        <p className="text-gray-600"><strong>Due Amount:</strong> ${parseFloat(payment.due_amount).toFixed(2)}</p>
                                        <p className="text-gray-600"><strong>Method:</strong> {payment.payment_method}</p>
                                        <p className="text-gray-600"><strong>Transaction ID:</strong> {payment.transaction_id}</p>
                                        <p className="text-gray-600"><strong>Payment Status:</strong> {payment.status}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <Link href={route('dashboard')} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition-colors">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </StorefrontLayout>
    );
}