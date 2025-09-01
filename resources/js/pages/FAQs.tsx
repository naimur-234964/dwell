import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQs: React.FC = () => {
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
            <Head title="FAQs" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Frequently Asked Questions</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Find answers to common questions about booking, hosting, and more.</p>
                    </div>
                </section>

                {/* FAQ Accordion Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-4">
                            <details className="p-6 border rounded-lg bg-white shadow-md">
                                <summary className="font-semibold cursor-pointer text-xl">What is Dream Dwell?</summary>
                                <p className="mt-4 text-gray-600">Dream Dwell is an online platform that connects travelers with unique vacation rental properties around the world.</p>
                            </details>
                            <details className="p-6 border rounded-lg bg-white shadow-md">
                                <summary className="font-semibold cursor-pointer text-xl">How do I book a property?</summary>
                                <p className="mt-4 text-gray-600">Browse properties, select your dates, and click "Book Now."</p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Still Have Questions Section */}
                <section className="py-20 px-4 text-center bg-primary text-white">
                    <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Our support team is here to help. Contact us for any further assistance.</p>
                    <a href="/contact-us" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">Contact Us</a>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default FAQs;