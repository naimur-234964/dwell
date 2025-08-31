import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const FAQs: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="FAQs" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-6 text-primary">Frequently Asked Questions (FAQs)</h1>
                <p className="text-lg mb-4">Find answers to common questions about booking, hosting, payments, and more.</p>
                
                <section className="mb-8">
                    <h2 className="text-4xl font-semibold mb-3 text-secondary">General Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-primary">What is Dream Dwell?</h3>
                            <p className="text-gray-700">Dream Dwell is an online platform that connects travelers with unique vacation rental properties around the world. We offer a wide range of accommodations, from cozy apartments to luxurious villas.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">How do I create an account?</h3>
                            <p className="text-gray-700">You can create an account by clicking on the "Sign Up" button in the top right corner of our website and following the simple registration process.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-4xl font-semibold mb-3 text-secondary">Booking Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-primary">How do I book a property?</h3>
                            <p className="text-gray-700">Browse properties, select your dates, and click "Book Now." Follow the prompts to complete your reservation and payment.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">What payment methods do you accept?</h3>
                            <p className="text-gray-700">We accept major credit cards (Visa, MasterCard, American Express) and other secure online payment options.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">Can I cancel my booking?</h3>
                            <p className="text-gray-700">Cancellation policies vary by property. Please check the specific listing's cancellation terms before booking. You can find this information on the property details page.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-4xl font-semibold mb-3 text-secondary">Hosting Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-primary">How do I list my property?</h3>
                            <p className="text-gray-700">Sign up as a host, then follow our step-by-step guide to create your property listing. You'll provide details, photos, and set your pricing and availability.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-primary">What are the fees for hosts?</h3>
                            <p className="text-gray-700">We charge a small commission on confirmed bookings. There are no upfront fees to list your property.</p>
                        </div>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default FAQs;
