import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <StorefrontLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Add your welcome page content here */}
            <div className="w-full lg:max-w-7xl lg:mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to Dream Dwell!</h1>
                <p className="text-lg mb-4">Find your perfect vacation rental with ease.</p>
                <p className="text-lg mb-4">Explore our properties, book your stay, and enjoy unforgettable experiences.</p>
                <div className="mt-8">
                    {auth.user ? (
                        <Link href={dashboard()} className="text-blue-600 hover:underline">Go to Dashboard</Link>
                    ) : (
                        <div className="flex space-x-4">
                            <Link href={register()} className="text-blue-600 hover:underline">Register</Link>
                            <Link href={login()} className="text-blue-600 hover:underline">Sign In</Link>
                        </div>
                    )}
                </div>
            </div>
        </StorefrontLayout>
    );
}
