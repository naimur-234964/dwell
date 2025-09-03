import { type SharedData, type Property as PropertyType, type User, type Address, type Amenity, type PropertyImage, type Review } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

interface ShowProperty extends PropertyType {
    address: Address;
    amenities: Amenity[];
    property_images: PropertyImage[];
    reviews: Review[];
    user: User;
    images: PropertyImage[];
}

interface ShowPageProps extends SharedData {
    property: ShowProperty;
    relatedProperties: PropertyType[];
    moreProperties: PropertyType[];
}

export default function Show() {
    const { property, relatedProperties, moreProperties } = usePage<ShowPageProps>().props;
    const [selectedImage, setSelectedImage] = useState(property.images && property.images.length > 0 ? property.images[0].image_path : '');

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>);
        }
        if (hasHalfStar) {
            stars.push(<svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" clipRule="evenodd" fillRule="evenodd"></path><path d="M10 15.5V4.5a.5.5 0 00-1 0v11a.5.5 0 001 0z" fill="#FCD34D"></path></svg>);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>);
        }
        return stars;
    };

    const PropertyCard = ({ property }: { property: PropertyType }) => (
        <Link href={`/properties/${property.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {property.image_path && (
                    <img
                        src={property.image_path}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{property.title}</h3>
                    <div className="text-gray-600 text-sm mb-2" dangerouslySetInnerHTML={{ __html: property.short_description || '' }} />
                    <div className="flex items-center">
                        {renderStars(Number(property.reviews_avg_rating || 0))}
                        <span className="ml-2 text-gray-600 text-sm">({Number(property.reviews_avg_rating || 0).toFixed(1)} stars)</span>
                    </div>
                    <p className="text-lg font-semibold mt-2">${property.price_per_night}</p>
                </div>
            </div>
        </Link>
    );

    return (
        <StorefrontLayout>
            <Head title={property.title} />
            <div className="container max-w-7xl mx-auto px-6 py-10 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            {selectedImage && (
                                <img src={selectedImage} alt={property.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
                            )}
                            <div className="grid grid-cols-5 gap-2">
                                {property.images && property.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.image_path}
                                        alt={property.title}
                                        className={`w-full h-auto rounded-lg cursor-pointer ${selectedImage === image.image_path ? 'border-2 border-primary' : ''}`}
                                        onClick={() => setSelectedImage(image.image_path)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                            <p className="text-lg text-gray-600 mb-4">{property.address.city}, {property.address.country}</p>
                            {property.short_description && (
                                <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: property.short_description }} />
                            )}
                            <div className="flex items-center mb-4">
                                {renderStars(Number(property.reviews_avg_rating || 0))}
                                <span className="ml-2 text-gray-600 text-sm">({property.reviews.length} reviews)</span>
                            </div>
                            <div className="text-2xl font-bold  mb-4">
                                {property.discount_price ? (
                                    <>
                                        <span className="text-red-600 line-through mr-4">${property.price_per_night}</span>
                                        <span className="font-semibold text-primary">${property.discount_price}</span>
                                    </>
                                ) : (
                                    `${property.price_per_night}`
                                )}
                            </div>
                            <Link href={route('properties.booking.create', { property: property.id })}>
                                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors">Book Now</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <Tabs.Root defaultValue="description">
                        <Tabs.List className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                            <Tabs.Trigger value="description" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Description</Tabs.Trigger>
                            <Tabs.Trigger value="reviews" className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">Reviews</Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="description" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: property.description }} />
                        </Tabs.Content>
                        <Tabs.Content value="reviews" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div className="space-y-4">
                                {property.reviews.map((review) => (
                                    <div key={review.id} className="border-b pb-4">
                                        <div className="flex items-center mb-2">
                                            <div className="font-bold mr-2">{review.user.name}</div>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>

                {relatedProperties.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">More properties you might like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
                        </div>
                    </div>
                )}

                {moreProperties.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Explore other properties</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {moreProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </StorefrontLayout>
    );
}
