import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const ContactUs: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Contact Us</h1>
                <p className="text-lg mb-4">We'd love to hear from you! Whether you have a question, feedback, or need assistance, our team is here to help.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">General Inquiries</h2>
                    <p className="mb-2">For general questions about Dream Dwell, our services, or partnership opportunities, please email us at:</p>
                    <p className="font-semibold"><a href="mailto:info@dreamdwell.com" className="text-blue-600 hover:underline">info@dreamdwell.com</a></p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Customer Support</h2>
                    <p className="mb-2">If you need assistance with a booking, property, or any other customer-related issue, please contact our support team:</p>
                    <p className="font-semibold"><a href="mailto:support@dreamdwell.com" className="text-blue-600 hover:underline">support@dreamdwell.com</a></p>
                    <p className="mt-2">Phone: +1 (800) 123-4567 (Monday - Friday, 9 AM - 5 PM EST)</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Host Support</h2>
                    <p className="mb-2">Are you a host with a question about your listing, payouts, or guest management? Reach out to our dedicated host support:</p>
                    <p className="font-semibold"><a href="mailto:hosts@dreamdwell.com" className="text-blue-600 hover:underline">hosts@dreamdwell.com</a></p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Mailing Address</h2>
                    <address className="not-italic">
                        Dream Dwell Headquarters<br/>
                        123 Main Street<br/>
                        Anytown, USA 12345
                    </address>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default ContactUs;
