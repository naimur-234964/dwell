import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
                <p className="text-lg mb-4">Your privacy is important to us. This Privacy Policy explains how Dream Dwell collects, uses, and protects your personal information when you use our website and services.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">1. Information We Collect</h2>
                    <p className="mb-2">We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support. This may include your name, email address, phone number, payment information, and other details.</p>
                    <p>We also collect information automatically when you use our platform, such as your IP address, browser type, device information, and usage data.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">2. How We Use Your Information</h2>
                    <p className="mb-2">We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Provide and improve our services.</li>
                        <li>Process your bookings and payments.</li>
                        <li>Communicate with you about your account and services.</li>
                        <li>Personalize your experience on our platform.</li>
                        <li>Analyze usage trends and improve our website.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">3. Sharing Your Information</h2>
                    <p className="mb-2">We may share your information with:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Property owners/managers to facilitate bookings.</li>
                        <li>Third-party service providers who assist us with payment processing, marketing, and analytics.</li>
                        <li>Law enforcement or government agencies when required by law.</li>
                    </ul>
                    <p className="mt-2">We do not sell your personal information to third parties.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">4. Data Security</h2>
                    <p className="mb-2">We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">5. Your Choices</h2>
                    <p className="mb-2">You can access, update, or delete your personal information by logging into your account settings. You may also opt out of receiving promotional communications from us.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default PrivacyPolicy;
