import React from 'react';
import { Head } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';

const CustomerDashboard: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="Customer Dashboard" />
            <section className="py-16 px-4 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    <div className="w-full text-gray-800 p-8">
                        <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard </h1>
                        <p className="text-lg mb-4">Here you can manage your account, view orders, and update your information.</p>
                        {/* Additional dashboard content can be added here */}
                    </div>
                </div>
            </section>
        </StorefrontLayout >
    );
};

export default CustomerDashboard;
