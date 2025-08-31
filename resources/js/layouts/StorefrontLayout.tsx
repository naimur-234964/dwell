import { StorefrontHeader } from '@/components/storefront-header';
import { StorefrontFooter } from '@/components/storefront-footer';
import { type PropsWithChildren } from 'react';

export default function StorefrontLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col">
            <StorefrontHeader />
            <main className="flex-grow pt-8">
                <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8 text-center">
                    <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to Dream Dwell!</h1>
                    <p className="text-lg mb-4">Find your perfect vacation rental with ease.</p>
                    <p className="text-lg mb-4">Explore our properties, book your stay, and enjoy unforgettable experiences.</p>
                </div>
                {children}
            </main>
            <StorefrontFooter />
        </div>
    );
}
