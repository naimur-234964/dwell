import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HostSupport: React.FC = () => {
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
            <Head title="Host Support" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We're Here to Help</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Your success is our priority. Get the support you need, when you need it.</p>
                    </div>
                </section>

                {/* Contact Options Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Contact Our Support Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg">Email Icon</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg">Phone Icon</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg">Chat Icon</div>
                        </div>
                    </div>
                </section>

                {/* Helpful Resources Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Helpful Resources</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">Find answers to common questions and learn best practices in our comprehensive resource center.</p>
                        <div className="flex justify-center space-x-4">
                            <Link href={route('host-faq')} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90">Host FAQ</Link>
                            <Link href={route('knowledge-base')} className="bg-white text-primary font-bold py-3 px-8 rounded-lg border-2 border-primary hover:bg-primary hover:text-white">Knowledge Base</Link>
                        </div>
                    </div>
                </section>

                {/* Community Forum Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Join Our Host Community</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">Connect with other hosts, share your experiences, and learn from the best in our exclusive community forum.</p>
                        <a href="/community" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90">Join the Conversation</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default HostSupport;