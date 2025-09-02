import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Property, SharedData } from '@/types';

interface PropertiesIndexProps extends SharedData {
    properties: {
        data: Property[];
        links: any[]; // Pagination links
    };
    filters: { location?: string };
}

export default function Index() {
    const { properties, filters } = usePage<PropertiesIndexProps>().props;

    return (
        <StorefrontLayout>
            <Head title="Properties" />

            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <h1 className="text-3xl font-bold mb-6">Properties {filters.location && `in ${filters.location}`}</h1>

                {properties.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.data.map((property) => (
                            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {property.property_images && property.property_images.length > 0 && (
                                    <img
                                        src={property.property_images[0].image_path} // Assuming image_path is directly accessible
                                        alt={property.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                                    <p className="text-gray-600 mb-2">{property.address.city}, {property.address.country}</p>
                                    <p className="text-lg font-semibold">${property.price_per_night} / night</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No properties found {filters.location && `in ${filters.location}`}.</p>
                )}
            </div>
        </StorefrontLayout>
    );
}
