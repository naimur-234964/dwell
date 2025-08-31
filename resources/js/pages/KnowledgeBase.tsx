import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const KnowledgeBase: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Host Knowledge Base</h1>
                <p className="text-lg mb-4">Our comprehensive knowledge base provides detailed articles and guides to help you become a successful Dream Dwell host.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Topics</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><h3 className="text-xl font-semibold mb-2 text-primary">Listing Optimization</h3>
                            <p className="text-gray-700">Learn how to create compelling listings that attract more guests. Tips on writing descriptions, taking great photos, and setting competitive prices.</p>
                        </li>
                        <li><h3 className="text-xl font-semibold mb-2 text-primary">Guest Communication Best Practices</h3>
                            <p className="text-gray-700">Effective communication is key to a positive guest experience. Find out how to respond to inquiries, manage expectations, and handle common guest issues.</p>
                        </li>
                        <li><h3 className="text-xl font-semibold mb-2 text-primary">Managing Your Calendar and Availability</h3>
                            <p className="text-gray-700">A well-maintained calendar prevents double bookings and ensures you're only available when you want to be. Learn how to sync calendars and block out dates.</p>
                        </li>
                        <li><h3 className="text-xl font-semibold mb-2 text-primary">Understanding Payouts and Taxes</h3>
                            <p className="text-gray-700">Get a clear understanding of how payouts work, our fee structure, and important tax considerations for hosts.</p>
                        </li>
                        <li><h3 className="text-xl font-semibold mb-2 text-primary">Safety and Security Guidelines</h3>
                            <p className="text-gray-700">Ensure the safety of your property and guests with our comprehensive safety guidelines and recommendations.</p>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Still Need Help?</h2>
                    <p>If you can't find the information you're looking for, please visit our <a href="/host-support" className="text-blue-600 hover:underline">Host Support</a> page or <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us</a> directly.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default KnowledgeBase;
