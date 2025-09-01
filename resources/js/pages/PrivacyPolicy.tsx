import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy: React.FC = () => {
    const main = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            if (self.selector) {
                const sections = self.selector('section');
                sections.forEach((section: any) => {
                    gsap.fromTo(
                        section.children,
                        { y: '+=30', opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.2,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 80%',
                            },
                        },
                    );
                });
            }
        }, main);
        return () => ctx.revert();
    }, []);

    return (
        <StorefrontLayout>
            <Head title="Privacy Policy" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Your Privacy Matters</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We are committed to protecting your personal information.</p>
                    </div>
                </section>

                {/* Privacy Content Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose lg:prose-xl">
                            <h2>1. Information We Collect</h2>
                            <p>We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support.</p>
                            
                            <h2>2. How We Use Your Information</h2>
                            <p>We use the information we collect to provide and improve our services, process your bookings and payments, and communicate with you.</p>

                            {/* Add more privacy content here */}
                        </div>
                    </div>
                </section>

                {/* Your Choices Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Your Privacy Choices</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">You have control over your personal data. Manage your settings and preferences in your account.</p>
                        <a href="/account/settings" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90">Manage Settings</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default PrivacyPolicy;