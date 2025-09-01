
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
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
            <Head title="Services" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Our Services</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We offer a range of services to make your travel experience seamless and enjoyable.</p>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">What We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Booking</h3>
                                <p className="text-gray-600 mb-4">Find and book your perfect vacation rental with ease.</p>
                                <Link href="/booking" className="text-primary font-bold hover:underline">Learn More</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Rental Management</h3>
                                <p className="text-gray-600 mb-4">Maximize your rental income with our powerful tools for hosts.</p>
                                <Link href="/rental-management" className="text-primary font-bold hover:underline">Learn More</Link>
                            </div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">
                                <h3 className="text-2xl font-semibold mb-3">Host Support</h3>
                                <p className="text-gray-600 mb-4">Get the support you need to be a successful host.</p>
                                <Link href="/host-support" className="text-primary font-bold hover:underline">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Why Choose Dream Dwell?</h2>
                        <p className="text-lg md:text-xl text-gray-600">We are committed to providing a seamless and enjoyable experience for both travelers and hosts. With our curated selection of properties, powerful tools, and dedicated support, we are the perfect partner for your next adventure.</p>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="py-20 px-4 text-center bg-primary text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <div className="space-x-4">
                        <a href="/properties" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">Book a Stay</a>
                        <a href="/host" className="border-2 border-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-300">Become a Host</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Services;
