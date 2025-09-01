
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Legal: React.FC = () => {
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
            <Head title="Legal" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Legal Information</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Important documents regarding your use of our services.</p>
                    </div>
                </section>

                {/* Legal Information Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Terms and Conditions</h3>
                                <p className="text-gray-600 mb-4">Read the terms and conditions that govern your use of our platform.</p>
                                <Link href="/terms-and-conditions" className="text-primary font-bold hover:underline">Read More</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Privacy Policy</h3>
                                <p className="text-gray-600 mb-4">Learn how we collect, use, and protect your personal information.</p>
                                <Link href="/privacy-policy" className="text-primary font-bold hover:underline">Read More</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Cookie Policy</h3>
                                <p className="text-gray-600 mb-4">Understand how we use cookies to improve your experience on our site.</p>
                                <Link href="/cookie-policy" className="text-primary font-bold hover:underline">Read More</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Legal Inquiries</h2>
                        <p className="text-lg md:text-xl text-gray-600">For any legal questions or concerns, please contact our legal team at <a href="mailto:legal@dreamdwell.com" className="text-primary hover:underline">legal@dreamdwell.com</a>.</p>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Legal;
