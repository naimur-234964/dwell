import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

interface PropertyGeoData {
    id: number;
    title: string;
    latitude: number;
    longitude: number;
    price_per_night: number;
    city: string;
    country: string;
}

const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: 0, // Default latitude
    lng: 0, // Default longitude
};

const PropertiesMap: React.FC = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    });

    const [properties, setProperties] = useState<PropertyGeoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(window.route('admin.dashboard.properties-geo-data'));
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: PropertyGeoData[] = await response.json();
                setProperties(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded) {
            fetchProperties();
        }
    }, [isLoaded]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps</div>;
    if (loading) return <div>Loading properties data...</div>;
    if (error) return <div>Error: {error}</div>;

    // Calculate center based on properties, or use a default if no properties
    const mapCenter = useMemo(() => {
        if (properties.length === 0) {
            return center;
        }
        const avgLat = properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length;
        const avgLng = properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length;
        return { lat: avgLat, lng: avgLng };
    }, [properties]);

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={properties.length > 0 ? 10 : 2} // Zoom in if properties exist, otherwise wider view
        >
            {properties.map((property) => (
                <Marker
                    key={property.id}
                    position={{ lat: property.latitude, lng: property.longitude }}
                    title={property.title}
                />
            ))}
        </GoogleMap>
    );
};

export default PropertiesMap;
