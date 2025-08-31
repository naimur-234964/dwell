import StorefrontLayout from '@/layouts/StorefrontLayout';
import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <StorefrontLayout>
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Terms and Conditions</h1>
                <p className="text-lg mb-4">Welcome to Dream Dwell. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">1. Acceptance of Terms</h2>
                    <p className="mb-2">By using the Dream Dwell platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">2. Changes to Terms</h2>
                    <p className="mb-2">Dream Dwell reserves the right to modify or revise these Terms and Conditions at any time. We will notify you of any changes by posting the new Terms and Conditions on this page. Your continued use of the platform after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">3. User Accounts</h2>
                    <p className="mb-2">To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">4. Booking and Payments</h2>
                    <p className="mb-2">All bookings made through Dream Dwell are subject to the specific terms and conditions of the property owner or manager. Payments are processed securely through our platform.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">5. Prohibited Conduct</h2>
                    <p className="mb-2">You agree not to use the platform for any unlawful or prohibited activities, including but not limited to: posting false information, infringing on intellectual property rights, or engaging in any form of harassment.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">6. Disclaimer of Warranties</h2>
                    <p className="mb-2">The Dream Dwell platform is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the platform.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default TermsAndConditions;
