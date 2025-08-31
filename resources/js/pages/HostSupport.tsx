import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

const HostSupport: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Host Support</h1>
                <p className="text-lg mb-4">At Dream Dwell, we are committed to providing our hosts with exceptional support. Our team is here to assist you with any questions, concerns, or issues you may encounter.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">How We Can Help</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Account setup and management.</li>
                        <li>Listing creation and optimization.</li>
                        <li>Booking and calendar management.</li>
                        <li>Payment processing and payouts.</li>
                        <li>Guest communication and conflict resolution.</li>
                        <li>Technical assistance.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Contact Our Support Team</h2>
                    <p className="mb-2">You can reach our host support team through the following channels:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Email: <a href="mailto:support@dreamdwell.com" className="text-blue-600 hover:underline">support@dreamdwell.com</a></li>
                        <li>Phone: +1 (800) 123-4567 (Monday - Friday, 9 AM - 5 PM EST)</li>
                        <li>Live Chat: Available on your host dashboard during business hours.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Helpful Resources</h2>
                    <p>Explore our comprehensive <Link href={route('host-faq')} className="text-blue-600 hover:underline">Host FAQ</Link> and <Link href={route('knowledge-base')} className="text-blue-600 hover:underline">Knowledge Base</Link> for self-service solutions and guides.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default HostSupport;
