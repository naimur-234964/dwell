import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Welcome() {
    const { auth, locations, topProperties, discountedProperties, latestProperties } = usePage<SharedData>().props;

    const getWeekendDates = () => {
        const today = new Date();
        let startDate = new Date(today);
        let endDate = new Date(today);

        // Find the next Friday (day 5) or current Friday if today is Friday or later
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        if (dayOfWeek <= 5) { // If today is Sunday to Friday
            startDate.setDate(today.getDate() + (5 - dayOfWeek));
        } else { // If today is Saturday
            startDate.setDate(today.getDate() + (5 + 7 - dayOfWeek)); // Next Friday
        }

        endDate.setDate(startDate.getDate() + 2); // Sunday

        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
        const startMonthDay = startDate.toLocaleDateString('en-US', options);
        const endMonthDay = endDate.toLocaleDateString('en-US', options);

        return `${startMonthDay} - ${endMonthDay}`;
    };

    const weekendDates = getWeekendDates();


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
            delay: 0.5,
        });

        gsap.from(".gsap-animated-location-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1, // Stagger the animation for each card
            delay: 1,
        });

        gsap.from(".gsap-animated-property-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1, // Stagger the animation for each card
            delay: 1.5,
        });

        gsap.from(".gsap-animated-discount-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1, // Stagger the animation for each card
            delay: 2,
        });

        gsap.from(".gsap-animated-latest-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1, // Stagger the animation for each card
            delay: 2.5,
        });

        gsap.from(".gsap-animated-why-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1, // Stagger the animation for each card
            delay: 3,
        });
    }, []);

    return (
        <StorefrontLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Welcome page specific content can go here if needed, otherwise leave empty */}
            <section className="mb-12">
                <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
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
                </div>
            </section>

            {locations.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                    <h2 className="text-2xl font-bold">Trending destinations</h2>
                    <p className="text-lg text-gray-600 mb-4">Most popular choices for travelers from Bangladesh</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {locations.map((location, index) => (
                            <Link
                                key={location.id}
                                href={`/properties?location=${location.name}`}
                                className="relative bg-cover bg-center rounded-lg overflow-hidden p-6 text-white h-64 flex items-end gsap-animated-location-card cursor-pointer"
                                style={{ backgroundImage: `url('${location.image_path}')` }}
                            >
                                <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay */}
                                <div className="relative z-10 flex items-center">
                                    <h3 className="text-xl font-bold mr-2">{location.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {topProperties.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                    <h2 className="text-2xl font-bold mb-2">Stay at our top unique properties</h2>
                    <p className="text-lg text-gray-600 mb-6">From castles and villas to boats and igloos, we have it all</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topProperties.map((property) => (
                            <Link key={property.id} href={`/properties/${property.id}`}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden gsap-animated-property-card">
                                    {property.image_path && (
                                        <img
                                            src={property.image_path}
                                            alt={property.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{property.address.city}, {property.address.country}</p>
                                        <div className="mb-2">
                                            {/* Render stars based on reviews_avg_rating */}
                                            <div className="flex items-center">
                                                {/* Render stars based on reviews_avg_rating */}
                                                {(() => {
                                                    const rating = Number(property.reviews_avg_rating || 0);
                                                    const fullStars = Math.floor(rating);
                                                    const hasHalfStar = rating - fullStars >= 0.5;
                                                    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                                                    const stars = [];

                                                    // Full stars
                                                    for (let i = 0; i < fullStars; i++) {
                                                        stars.push(
                                                            <svg
                                                                key={`full-${i}`}
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                                            </svg>
                                                        );
                                                    }

                                                    // Half star
                                                    if (hasHalfStar) {
                                                        stars.push(
                                                            <svg
                                                                key="half"
                                                                className="w-5 h-5 text-yellow-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" clipRule="evenodd" fillRule="evenodd"></path>
                                                                <path d="M10 15.5V4.5a.5.5 0 00-1 0v11a.5.5 0 001 0z" fill="#FCD34D"></path>
                                                            </svg>
                                                        );
                                                    }

                                                    // Empty stars
                                                    for (let i = 0; i < emptyStars; i++) {
                                                        stars.push(
                                                            <svg
                                                                key={`empty-${i}`}
                                                                className="w-5 h-5 text-gray-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                                            </svg>
                                                        );
                                                    }

                                                    return stars;
                                                })()}
                                                <span className="ml-2 text-gray-600 text-sm">({Number(property.reviews_avg_rating || 0).toFixed(1)} stars)</span>
                                            </div>
                                        </div>
                                        <p className="text-lg font-semibold">
                                            {property.discount_price ? (
                                                <>
                                                    <span className="text-gray-500 line-through mr-2">${property.price_per_night}</span>
                                                    <span className="text-lg font-semibold text-red-600">${property.discount_price}</span>
                                                </>
                                            ) : (
                                                `${property.price_per_night}`
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            )}

            {discountedProperties.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                    <h2 className="text-2xl font-bold mb-2">Deals for the weekend</h2>
                    <p className="text-lg text-gray-600 mb-6">Save on stays for {weekendDates}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {discountedProperties.map((property) => (
                            <Link key={property.id} href={`/properties/${property.id}`}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden gsap-animated-discount-card">
                                    {property.image_path && (
                                        <img
                                            src={property.image_path}
                                            alt={property.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{property.address.city}, {property.address.country}</p>
                                        <p className="text-lg font-semibold">
                                            {property.discount_price ? (
                                                <>
                                                    <span className="text-gray-500 line-through mr-2">${property.price_per_night}</span>
                                                    <span className="text-lg font-semibold text-red-600">${property.discount_price}</span>
                                                </>
                                            ) : (
                                                `${property.price_per_night}`
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {latestProperties.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                    <h2 className="text-2xl font-bold mb-2">Latest Properties</h2>
                    <p className="text-lg text-gray-600 mb-6">Discover our newest listings</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestProperties.map((property) => (
                            <Link key={property.id} href={`/properties/${property.id}`}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden gsap-animated-latest-card">
                                    {property.image_path && (
                                        <img
                                            src={property.image_path}
                                            alt={property.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{property.address.city}, {property.address.country}</p>
                                        <p className="text-lg font-semibold">
                                            {property.discount_price ? (
                                                <>
                                                    <span className="text-gray-500 line-through mr-2">${property.price_per_night}</span>
                                                    <span className="text-lg font-semibold text-red-600">${property.discount_price}</span>
                                                </>
                                            ) : (
                                                `${property.price_per_night}`
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <section className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Why Dream Dwell?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center gsap-animated-why-card">
                        {/* Placeholder Icon 1 */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16l4 4m0 0l-4-4m4 4L17 16"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Book now, pay at the property</h3>
                        <p className="text-gray-600 text-sm">FREE cancellation on most rooms</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center gsap-animated-why-card">
                        {/* Placeholder Icon 2 */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H12a2 2 0 01-2-2v-7a2 2 0 012-2h2zM7 9h1.5a2 2 0 001.555-3.243l-1.555-2.757a1 1 0 00-1.732 0l-1.555 2.757A2 2 0 007 9z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">300M+ reviews from fellow travelers</h3>
                        <p className="text-gray-600 text-sm">Get trusted information from guests like you</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center gsap-animated-why-card">
                        {/* Placeholder Icon 3 */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.5 10a18.022 18.022 0 01-3.5-5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.5 10a18.022 18.022 0 01-3.5-5h12m7 0l-4 4m0 0l4 4m0-4h-4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">2+ million properties worldwide</h3>
                        <p className="text-gray-600 text-sm">Hotels, guest houses, apartments, and more...</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center gsap-animated-why-card">
                        {/* Placeholder Icon 4 */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Trusted 24/7 customer service you can rely on</h3>
                        <p className="text-gray-600 text-sm">We're always here to help</p>
                    </div>
                </div>
            </section>


        </StorefrontLayout>
    );
}
