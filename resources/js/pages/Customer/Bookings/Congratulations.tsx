import { type SharedData, type Booking } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

interface CongratulationsPageProps extends SharedData {
    booking: Booking;
}

export default function Congratulations() {
    const { booking } = usePage<CongratulationsPageProps>().props;
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            router.visit(route('dashboard'));
        }, 5000);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearTimeout(redirectTimer);
            clearInterval(countdownInterval);
        };
    }, []);

    return (
        <StorefrontLayout>
            <Head title="Congratulations!" />
            <div className="container max-w-4xl mx-auto px-6 py-10 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-6">Congratulations!</h1>
                    <p className="text-lg text-gray-700 mb-4">Your booking has been successfully confirmed.</p>

                    <div className="mt-8 text-left inline-block">
                        <h2 className="text-xl font-semibold mb-2">Booking Details:</h2>
                        <p className="text-gray-600"><strong>Booked by:</strong> {booking.customer.name}</p>
                        <p className="text-gray-600"><strong>Property:</strong> {booking.property.title}</p>
                        <p className="text-gray-600"><strong>Check-in Date:</strong> {booking.check_in_date}</p>
                        <p className="text-gray-600"><strong>Check-out Date:</strong> {booking.check_out_date}</p>
                    </div>

                    <p className="text-md text-gray-600 mt-8">
                        You will be redirected to your dashboard in {countdown} seconds...
                    </p>
                </div>
            </div>
        </StorefrontLayout>
    );
}
