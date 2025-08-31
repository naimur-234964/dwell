import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="About Us" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">About Dream Dwell</h1>
                <p className="text-lg mb-4">Dream Dwell was founded with a simple mission: to connect travelers with unique and unforgettable vacation rental experiences. We believe that where you stay is just as important as where you go, and we're dedicated to helping you find the perfect home away from home.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Our Story</h2>
                    <p className="mb-2">It all started with a passion for travel and a desire to make vacation planning easier and more enjoyable. We noticed a gap in the market for a platform that not only offered a wide selection of properties but also prioritized quality, trust, and exceptional customer service.</p>
                    <p>From humble beginnings, Dream Dwell has grown into a thriving community of travelers and hosts, all sharing a love for exploration and authentic experiences.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Our Values</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>**Quality:** We meticulously curate our listings to ensure every property meets our high standards.</li>
                        <li>**Trust:** We foster a transparent and secure environment for both guests and hosts.</li>
                        <li>**Community:** We believe in the power of connection and building lasting relationships.</li>
                        <li>**Innovation:** We continuously strive to improve our platform and offer cutting-edge features.</li>
                        <li>**Service:** We are dedicated to providing outstanding support and a seamless experience.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Join Our Journey</h2>
                    <p>Whether you're looking for your next adventure or want to share your property with the world, we invite you to join the Dream Dwell community. Discover the difference of a truly exceptional vacation rental experience.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default AboutUs;
