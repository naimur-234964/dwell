import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const HostFAQ: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Host Frequently Asked Questions</h1>
                <p className="text-lg mb-4">Here are some common questions asked by our hosts. If you can't find your answer here, please contact our support team.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Getting Started</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-primary">How do I list my property on Dream Dwell?</h3>
                            <p className="text-gray-700">To list your property, first create a host account. Then, navigate to your dashboard and follow the step-by-step guide to create your listing. You'll need to provide property details, high-quality photos, and set your availability and pricing.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-primary">What are the requirements for listing a property?</h3>
                            <p className="text-gray-700">Your property should be safe, clean, and accurately described. We encourage hosts to provide essential amenities and clear house rules. Specific requirements may vary by location.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Bookings and Payments</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-primary">How do I manage my bookings?</h3>
                            <p className="text-gray-700">All your bookings can be managed directly from your host dashboard. You can view upcoming reservations, communicate with guests, and update your calendar.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-primary">When do I receive my payouts?</h3>
                            <p className="text-gray-700">Payouts are typically processed within 24-48 hours after guest check-in. The exact timing may depend on your chosen payout method and bank processing times.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Support and Resources</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-primary">Where can I find more resources for hosts?</h3>
                            <p className="text-gray-700">Visit our <a href="/knowledge-base" className="text-blue-600 hover:underline">Knowledge Base</a> for in-depth articles, tips, and best practices for successful hosting.</p>
                        </div>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default HostFAQ;
