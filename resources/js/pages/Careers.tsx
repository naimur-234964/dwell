import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Careers: React.FC = () => {
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
            <Head title="Careers" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Shape the Future of Travel</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Join our passionate team and build a platform that connects people with unforgettable experiences.</p>
                    </div>
                </section>

                {/* Why Work With Us Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Why Join Dream Dwell?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Benefit 1</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Benefit 2</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Benefit 3</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Benefit 4</div>
                        </div>
                    </div>
                </section>

                {/* Current Openings Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Current Openings</h2>
                        <div className="space-y-4">
                            <div className="p-6 border rounded-lg bg-white shadow-md flex justify-between items-center"><div><h3 className="text-xl font-semibold">Software Engineer</h3><p className="text-gray-600">Remote</p></div><a href="#" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90">Apply</a></div>
                            <div className="p-6 border rounded-lg bg-white shadow-md flex justify-between items-center"><div><h3 className="text-xl font-semibold">Product Manager</h3><p className="text-gray-600">New York</p></div><a href="#" className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90">Apply</a></div>
                        </div>
                    </div>
                </section>

                {/* Our Hiring Process Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-12 text-primary">Our Hiring Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="flex flex-col items-center">Step 1</div>
                            <div className="flex flex-col items-center">Step 2</div>
                            <div className="flex flex-col items-center">Step 3</div>
                            <div className="flex flex-col items-center">Step 4</div>
                        </div>
                    </div>
                </section>

                {/* Employee Testimonials Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">What Our Team Says</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <p className="text-xl italic text-gray-600">"Working at Dream Dwell has been an incredible experience. The culture is amazing, and I get to work on a product I'm passionate about."</p>
                            <p className="mt-4 font-semibold">- Alex Doe, Software Engineer</p>
                        </div>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Careers;