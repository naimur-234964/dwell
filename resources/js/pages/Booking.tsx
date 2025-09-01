import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Booking: React.FC = () => {
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
            <Head title="Booking" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Find Your Perfect Stay</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Search, book, and enjoy your dream vacation rental with ease.</p>
                    </div>
                </section>

                {/* Search Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-8 rounded-lg shadow-lg">
                            <input type="text" placeholder="Location" className="p-4 border rounded" />
                            <input type="date" className="p-4 border rounded" />
                            <input type="date" className="p-4 border rounded" />
                            <button type="submit" className="md:col-span-1 bg-primary text-white font-bold py-4 px-8 rounded hover:bg-opacity-90">Search</button>
                        </form>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-12 text-primary">How to Book</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center">
                                <div className="bg-primary text-white rounded-full p-6 mb-4 text-4xl">1</div>
                                <h3 className="text-2xl font-semibold mb-2">Browse Properties</h3>
                                <p className="text-gray-600">Explore our curated collection of homes.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-primary text-white rounded-full p-6 mb-4 text-4xl">2</div>
                                <h3 className="text-2xl font-semibold mb-2">Select Dates</h3>
                                <p className="text-gray-600">Choose your check-in and check-out dates.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-primary text-white rounded-full p-6 mb-4 text-4xl">3</div>
                                <h3 className="text-2xl font-semibold mb-2">Book & Confirm</h3>
                                <p className="text-gray-600">Complete your booking and get instant confirmation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Properties Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Featured Properties</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <img src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=${i}`} alt="Property" className="w-full h-64 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold">Modern Beach House</h3>
                                        <p className="text-primary">$250 / night</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cancellation Policy Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Flexible Cancellations</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">Book with confidence. Many of our properties offer flexible cancellation policies. Please review the specific terms on each property's listing page.</p>
                        <a href="/faqs" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors duration-300">Learn More</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Booking;