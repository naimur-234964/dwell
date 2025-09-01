import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
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
            <Head title="About Us" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Connecting Travelers, Creating Memories</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We believe travel is about more than just a destination; it's about the experience.</p>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Our Mission</h2>
                        <p className="text-lg md:text-xl text-gray-600">To connect travelers with unique and unforgettable vacation rental experiences. We believe that where you stay is just as important as where you go, and we're dedicated to helping you find the perfect home away from home.</p>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                            {['Quality', 'Trust', 'Community', 'Innovation', 'Service'].map((value) => (
                                <div key={value} className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold mb-3">{value}</h3>
                                    <p className="text-gray-600">We meticulously curate our listings to ensure every property meets our high standards.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet the Team Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Meet Our Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                    <img src={`https://i.pravatar.cc/300?img=${i + 1}`} alt="Team Member" className="w-full h-64 object-cover" />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold">John Doe</h3>
                                        <p className="text-primary">CEO & Founder</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Join Our Journey Section */}
                <section className="py-20 px-4 text-center bg-primary text-white">
                    <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Whether you're looking for your next adventure or want to share your property with the world, we invite you to join the Dream Dwell community.</p>
                    <div className="space-x-4">
                        <a href="/properties" className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors duration-300">Book a Stay</a>
                        <a href="/host" className="border-2 border-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors duration-300">Become a Host</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default AboutUs;