import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const Booking: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="Booking" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Booking Your Dream Stay</h1>
                <p className="text-lg mb-4">Welcome to the booking page! Here you can find all the information you need to reserve your perfect vacation rental.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">How to Book</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Browse our extensive collection of properties.</li>
                        <li>Select your desired dates and number of guests.</li>
                        <li>Review the property details, amenities, and house rules.</li>
                        <li>Proceed to checkout and complete your payment securely.</li>
                        <li>Receive instant confirmation of your booking!</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Payment Information</h2>
                    <p className="mb-2">We accept various payment methods, including major credit cards and secure online payment gateways.</p>
                    <p>All transactions are encrypted and your financial information is kept safe.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Cancellation Policy</h2>
                    <p className="mb-2">Our cancellation policies vary by property. Please review the specific cancellation terms on each property's listing page before confirming your booking.</p>
                    <p>For any questions regarding cancellations, please contact our support team.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Need Help?</h2>
                    <p>If you encounter any issues or have questions during the booking process, please visit our <a href="/faqs" className="text-blue-600 hover:underline">FAQs</a> or <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us</a> page.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Booking;
