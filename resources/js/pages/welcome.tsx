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
            {/* Welcome page specific content can go here if needed, otherwise leave empty */}
        </StorefrontLayout>
    );
}
