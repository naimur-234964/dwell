import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const Attractions: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="Attractions" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8 text-center">
                <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8 text-center">
                    <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to Dream Dwell!</h1>
                    <p className="text-lg mb-4">Find your perfect vacation rental with ease.</p>
                    <p className="text-lg mb-4">Explore our properties, book your stay, and enjoy unforgettable experiences.</p>
                </div>
                <h1 className="text-4xl font-bold mb-6 text-primary">Attractions</h1>
                <p className="text-lg mb-4">Very soon we will provide this service.</p>
                <p className="text-md text-gray-600">Stay tuned for exciting travel options!</p>
            </div>
        </StorefrontLayout>
    );
};

export default Attractions;
