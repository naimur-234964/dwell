import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const Press: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="Press" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Dream Dwell in the News</h1>
                <p className="text-lg mb-4">Welcome to the Dream Dwell press room. Here you'll find our latest press releases, media kits, and news coverage.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Latest Press Releases</h2>
                    <div className="space-y-4">
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-primary">Dream Dwell Announces Expansion into European Markets</h3>
                            <p className="text-gray-700">[Date]: Dream Dwell, a leading vacation rental platform, today announced its strategic expansion into key European markets, offering travelers an even wider selection of unique accommodations.</p>
                            <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Read More</a>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-primary">Dream Dwell Partners with Local Tourism Boards to Promote Sustainable Travel</h3>
                            <p className="text-gray-700">[Date]: In an effort to promote responsible tourism, Dream Dwell has partnered with several local tourism boards to highlight eco-friendly properties and experiences.</p>
                            <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Read More</a>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Media Kit</h2>
                    <p className="mb-2">Download our media kit for high-resolution logos, brand guidelines, and company information.</p>
                    <a href="#" className="text-blue-600 hover:underline">Download Media Kit (PDF)</a>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Media Contact</h2>
                    <p className="mb-2">For all media inquiries, please contact our press team:</p>
                    <p>Email: <a href="mailto:press@dreamdwell.com" className="text-blue-600 hover:underline">press@dreamdwell.com</a></p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Press;
