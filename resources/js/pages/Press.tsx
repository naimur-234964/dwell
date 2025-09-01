import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Press: React.FC = () => {
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
            <Head title="Press" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Dream Dwell in the News</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Sharing our story with the world. Find our latest press releases, media kits, and news coverage here.</p>
                    </div>
                </section>

                {/* In the News Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">As Featured In</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
                            <div className="grayscale hover:grayscale-0 transition-all">Logo 1</div>
                            <div className="grayscale hover:grayscale-0 transition-all">Logo 2</div>
                            <div className="grayscale hover:grayscale-0 transition-all">Logo 3</div>
                            <div className="grayscale hover:grayscale-0 transition-all">Logo 4</div>
                        </div>
                    </div>
                </section>

                {/* Press Releases Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Latest Press Releases</h2>
                        <div className="space-y-6">
                            <div className="p-6 border rounded-lg bg-white shadow-md">...</div>
                            <div className="p-6 border rounded-lg bg-white shadow-md">...</div>
                        </div>
                    </div>
                </section>

                {/* Media Kit Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Media Kit</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">Download our official brand assets, including logos, photos, and brand guidelines.</p>
                        <a href="#" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90">Download Media Kit</a>
                    </div>
                </section>

                {/* Media Contact Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Media Inquiries</h2>
                        <form className="bg-white p-8 rounded-lg shadow-lg space-y-4">
                            <input type="text" placeholder="Name" className="w-full p-4 border rounded" />
                            <input type="email" placeholder="Email" className="w-full p-4 border rounded" />
                            <textarea placeholder="Message" className="w-full p-4 border rounded" rows={5}></textarea>
                            <button type="submit" className="w-full bg-primary text-white font-bold py-4 px-8 rounded hover:bg-opacity-90">Submit</button>
                        </form>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default Press;