import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

const Careers: React.FC = () => {
    return (
        <StorefrontLayout>
            <Head title="Careers" />
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Careers at Dream Dwell</h1>
                <p className="text-lg mb-4">Join our passionate team and help us shape the future of vacation rentals. At Dream Dwell, we're building a platform that connects people with unforgettable experiences, and we're looking for talented individuals to grow with us.</p>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Why Work With Us?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>**Impact:** Contribute to a product that brings joy and unique experiences to thousands.</li>
                        <li>**Culture:** Work in a collaborative, innovative, and supportive environment.</li>
                        <li>**Growth:** Opportunities for professional development and career advancement.</li>
                        <li>**Flexibility:** Enjoy a healthy work-life balance with flexible arrangements.</li>
                        <li>**Benefits:** Competitive salaries, comprehensive health benefits, and more.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Current Openings</h2>
                    <p className="mb-4">We're always looking for bright minds to join our team. Check out our current openings below:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Software Engineer (Frontend/Backend)</li>
                        <li>Product Manager</li>
                        <li>Customer Support Specialist</li>
                        <li>Marketing Manager</li>
                        <li>UI/UX Designer</li>
                    </ul>
                    <p className="mt-4">Don't see a role that fits? Send us your resume at <a href="mailto:careers@dreamdwell.com" className="text-blue-600 hover:underline">careers@dreamdwell.com</a> and tell us how you can contribute!</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 text-primary">Our Hiring Process</h2>
                    <p>We believe in a fair and transparent hiring process. Typically, it involves an initial application review, a phone screening, technical or behavioral interviews, and a final decision. We aim to make the process as smooth and informative as possible.</p>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Careers;
