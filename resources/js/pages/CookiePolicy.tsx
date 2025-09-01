import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CookiePolicy: React.FC = () => {
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
            <Head title="Cookie Policy" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Cookie Policy</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We use cookies to improve your experience on our site.</p>
                    </div>
                </section>

                {/* What Are Cookies Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">What Are Cookies?</h2>
                        <p className="text-lg md:text-xl text-gray-600">Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us provide a better and more personalized experience.</p>
                    </div>
                </section>

                {/* How We Use Cookies Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">How We Use Cookies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Essential</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Analytical</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Functionality</div>
                            <div className="p-8 border border-gray-200 rounded-lg shadow-lg text-center">Advertising</div>
                        </div>
                    </div>
                </section>

                {/* Your Choices Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Your Cookie Choices</h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">You can manage your cookie preferences through your browser settings. However, disabling certain cookies may affect your experience on our site.</p>
                        <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90">Learn More</a>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default CookiePolicy;