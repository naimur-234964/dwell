import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const CarRentals: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-6 text-primary">Car Rentals</h1>
                <p className="text-lg mb-4">Very soon we will provide this service.</p>
                <p className="text-md text-gray-600">Stay tuned for exciting travel options!</p>
            </div>
        </StorefrontLayout>
    );
};

export default CarRentals;
