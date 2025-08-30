import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type Property } from '@/types';

interface HostPropertyIndexProps {
    properties: Property[];
}

export default function HostPropertyIndex({ properties }: HostPropertyIndexProps) {
    return (
        <AppLayout>
            <Head title="Host Properties" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">My Properties</h1>
                {properties.length > 0 ? (
                    <ul>
                        {properties.map((property) => (
                            <li key={property.id} className="mb-2 p-2 border rounded">
                                <h2 className="text-xl font-semibold">{property.title}</h2>
                                <p>Price: ${property.price_per_night}</p>
                                <p>Guests: {property.number_of_guests}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
        </AppLayout>
    );
}
