import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        gsap.from(".gsap-animated-heading", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
        });

        gsap.from(".gsap-animated-quick-escape-heading", {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: "power3.out",
            delay: 0.5, // Add a slight delay to animate after the first one
        });
    }, []);

    return (
        <StorefrontLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Welcome page specific content can go here if needed, otherwise leave empty */}
            <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <section className="mb-12">
                    <h2 className="text-2xl font-bold">Offers</h2>
                    <p className="text-lg text-gray-600 mb-4">Promotions, deals, and special offers for you</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Card: Vacation Rentals */}
                        <div className="relative bg-cover bg-center rounded-lg overflow-hidden p-8 text-white" style={{ backgroundImage: "url('https://media.greatbigphotographyworld.com/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg')" }}>
                            <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay */}
                            <div className="relative z-10">
                                <p className="text-sm mb-2">Vacation rentals</p>
                                <h3 className="text-3xl font-bold mb-4 gsap-animated-heading">Live the dream in a vacation home</h3>
                                <p className="text-md mb-6">Choose from houses, villas, cabins, and more</p>
                                <Link href="#" className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                                    Book yours
                                </Link>
                            </div>
                        </div>

                        {/* Right Card: Quick Escape */}
                        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold mb-2 gsap-animated-quick-escape-heading">Quick escape, quality time</h3>
                                <p className="text-md text-gray-600 mb-6">Save up to 20% with a Getaway Deal</p>
                                <Link href="#" className="inline-block bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                                    Save on stays
                                </Link>
                            </div>
                            <div className="flex-shrink-0 h-48 w-48 justify-center items-center overflow-hidden p-10">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_GArPUV41vV6cHuzgveFv0EcsFzwMCIe4A&s" alt="Happy couple" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </StorefrontLayout>
    );
}
