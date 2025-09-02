import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RentalManagement: React.FC = () => {
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
            <Head title="Rental Management" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Maximize Your Rental Income</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Effortlessly manage your properties and connect with a global network of travelers.</p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Powerful Tools for Hosts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Icon 1</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Icon 2</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Icon 3</div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-12 text-primary">Get Started in 3 Simple Steps</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center border border-primary rounded-lg p-10 hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary text-white rounded-full px-6 py-3 mb-4 text-4xl">1</div>
                                <h3 className="text-2xl font-semibold mb-2">List Your Property</h3>
                                <p className="text-gray-600">Create a stunning listing with our easy-to-use tools.</p>
                            </div>
                            <div className="flex flex-col items-center border border-primary rounded-lg p-10 hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary text-white rounded-full px-6 py-3 mb-4 text-4xl">2</div>
                                <h3 className="text-2xl font-semibold mb-2">Accept Bookings</h3>
                                <p className="text-gray-600">Manage your calendar and accept bookings from travelers.</p>
                            </div>
                            <div className="flex flex-col items-center border border-primary rounded-lg p-10 hover:shadow-lg transition-shadow duration-300">
                                <div className="bg-primary text-white rounded-full px-6 py-3 mb-4 text-4xl">3</div>
                                <h3 className="text-2xl font-semibold mb-2">Get Paid</h3>
                                <p className="text-gray-600">Receive secure payments directly to your account.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Host Testimonials Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">What Our Hosts Say</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <p className="text-xl italic text-gray-600">"Dream Dwell has transformed my rental business. The platform is intuitive, and the support is top-notch."</p>
                            <p className="mt-4 font-semibold">- Jane Doe, Superhost</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="p-4 border rounded-lg">
                                <summary className="font-semibold cursor-pointer">How much does it cost to list my property?</summary>
                                <p className="mt-2 text-gray-600">Listing your property on Dream Dwell is free. We only charge a small commission on confirmed bookings.</p>
                            </details>
                            <details className="p-4 border rounded-lg">
                                <summary className="font-semibold cursor-pointer">How do I get paid?</summary>
                                <p className="mt-2 text-gray-600">We process payments securely and transfer the funds to your preferred account after a guest checks in.</p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Become a Host Section */}
                <section className="py-20 px-4 text-center bg-primary text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Hosting?</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Join our community of successful hosts and turn your property into a source of income.</p>
                    <a href="/host/register" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">Become a Host</a>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default RentalManagement;