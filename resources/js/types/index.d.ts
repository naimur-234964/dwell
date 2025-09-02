import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    locations: Location[];
    topProperties: Property[];
    discountedProperties: Property[];
    latestProperties: Property[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Amenity {
    id: number;

    name: string;
}

export interface Address {
    id: number;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

export interface Property {
    id: number;
    user_id: number;
    title: string;
    description: string;
    price_per_night: number;
    discount_price?: number; // Added for discounted properties
    number_of_guests: number;
    number_of_bedrooms: number;
    number_of_beds: number;
    number_of_bathrooms: number;
    is_available: boolean;
    address: Address;
    amenities: Amenity[];
    bookings_count?: number;
    propertyImages?: PropertyImage[];
    reviews_avg_rating?: number;
    image_path?: string; // For the first image URL
}

export interface PropertyImage {
    id: number;
    property_id: number;
    image_path: string;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface Location {
    id: number;
    name: string;
    image_path: string;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: number;
    property_id: number;
    user_id: number; // This is the customer_id in the database
    customer_id: number; // Explicitly add customer_id
    customer?: User; // Add customer relationship
    property?: Partial<Property>; // Add property relationship
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    status: string;
    created_at: string;
    updated_at: string;
}


declare global {
    interface Window {
        route: (...args: any[]) => string;
    }
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User;
            userRole: string;
        };
        // Add other shared props here if they are always present
        // e.g., errors: Errors;
        // flash: { message: string };
    }
}

declare module '@inertiajs/react' {
    interface PageProps {
        auth: {
            user: User;
            userRole: string;
        };
        // Add other shared props here if they are always present
        // e.g., errors: Errors;
        // flash: { message: string };
    }
}