import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const RentalManagement: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Rental Management for Hosts</h1>
                <p className="text-lg mb-4">Manage your properties with ease and maximize your rental income. Dream Dwell provides powerful tools for hosts.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Key Features</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Centralized dashboard for all your listings.</li>
                        <li>Effortless booking and calendar synchronization.</li>
                        <li>Automated guest communication tools.</li>
                        <li>Performance analytics and insights.</li>
                        <li>Secure payment processing and payouts.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Getting Started</h2>
                    <p className="mb-2">Becoming a host is simple. Create your account, list your property, and start earning!</p>
                    <p>Our intuitive interface guides you through every step of the process.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Host Support</h2>
                    <p>Access dedicated host support to help you with any questions or issues. We're here to ensure your success.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default RentalManagement;
