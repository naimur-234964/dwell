
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HelpfulLinks: React.FC = () => {
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
            <Head title="Helpful Links" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Helpful Links</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Find quick links to important pages on our site.</p>
                    </div>
                </section>

                {/* Helpful Links Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
                                <p className="text-gray-600 mb-4">Get in touch with our team for any questions or feedback.</p>
                                <Link href="/contact-us" className="text-primary font-bold hover:underline">Go to Page</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">FAQs</h3>
                                <p className="text-gray-600 mb-4">Find answers to common questions about our services.</p>
                                <Link href="/faqs" className="text-primary font-bold hover:underline">Go to Page</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Terms & Conditions</h3>
                                <p className="text-gray-600 mb-4">Read the terms and conditions that govern your use of our platform.</p>
                                <Link href="/terms-and-conditions" className="text-primary font-bold hover:underline">Go to Page</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Privacy Policy</h3>
                                <p className="text-gray-600 mb-4">Learn how we collect, use, and protect your personal information.</p>
                                <Link href="/privacy-policy" className="text-primary font-bold hover:underline">Go to Page</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default HelpfulLinks;
