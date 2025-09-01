import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TermsAndConditions: React.FC = () => {
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
            <Head title="Terms and Conditions" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Terms and Conditions</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Please read these terms carefully before using our services.</p>
                    </div>
                </section>

                {/* Terms Content Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose lg:prose-xl">
                            <h2>1. Acceptance of Terms</h2>
                            <p>By using the Dream Dwell platform, you agree to comply with and be bound by these Terms and Conditions.</p>
                            
                            <h2>2. Changes to Terms</h2>
                            <p>Dream Dwell reserves the right to modify or revise these Terms and Conditions at any time.</p>

                            {/* Add more terms content here */}
                        </div>
                    </div>
                </section>

                {/* Agreement Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <label className="flex items-center justify-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" />
                            <span className="ml-2 text-lg">I have read and agree to the Terms and Conditions.</span>
                        </label>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default TermsAndConditions;