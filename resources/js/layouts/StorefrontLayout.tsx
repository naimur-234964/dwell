import { StorefrontHeader } from '@/components/storefront-header';
import { StorefrontFooter } from '@/components/storefront-footer';
import { type PropsWithChildren } from 'react';

export default function StorefrontLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col">
            <StorefrontHeader />
            <main className="flex-grow pt-8">                
                {children}
            </main>
            <StorefrontFooter />
        </div>
    );
}
