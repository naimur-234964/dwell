import StorefrontLayout from '@/layouts/StorefrontLayout';
import { Head } from '@inertiajs/react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUs: React.FC = () => {
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
            <Head title="Contact Us" />
            <div ref={main} className="w-full text-gray-800">
                <section className="relative bg-cover bg-center text-white py-32 px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop')" }}>
                    <div className="relative max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Get in Touch</h1>
                        <p className="text-lg md:text-xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>We'd love to hear from you. Whether you have a question, feedback, or need assistance, our team is here to help.</p>
                    </div>
                </section>

                {/* Contact Form & Info Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-primary">Send Us a Message</h2>
                            <form className="space-y-4">
                                <input type="text" placeholder="Name" className="w-full p-4 border rounded" />
                                <input type="email" placeholder="Email" className="w-full p-4 border rounded" />
                                <textarea placeholder="Message" className="w-full p-4 border rounded" rows={5}></textarea>
                                <button type="submit" className="w-full bg-primary text-white font-bold py-4 px-8 rounded hover:bg-opacity-90">Submit</button>
                            </form>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-semibold mb-3 text-primary">Contact Information</h3>
                                <p>Email: info@dreamdwell.com</p>
                                <p>Phone: +1 (800) 123-4567</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-3 text-primary">Our Office</h3>
                                <p>123 Main Street, Anytown, USA 12345</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-16 px-4 lg:px-0 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center text-primary">Find Us Here</h2>
                        <div className="h-96 bg-gray-300 rounded-lg shadow-lg">
                            <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14618.294314621471!2d90.47855065!3d23.6554376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1756722340502!5m2!1sen!2sus"></iframe>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 px-4 lg:px-0">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="p-4 border rounded-lg">
                                <summary className="font-semibold cursor-pointer">What are your business hours?</summary>
                                <p className="mt-2 text-gray-600">Our support team is available Monday - Friday, 9 AM - 5 PM EST.</p>
                            </details>
                            <details className="p-4 border rounded-lg">
                                <summary className="font-semibold cursor-pointer">How can I become a host?</summary>
                                <p className="mt-2 text-gray-600">You can learn more about becoming a host and sign up on our Rental Management page.</p>
                            </details>
                        </div>
                    </div>
                </section>
            </div>
        </StorefrontLayout>
    );
};

export default ContactUs;