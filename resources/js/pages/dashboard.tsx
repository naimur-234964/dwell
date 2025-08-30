import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    userRole: string;
}

export default function Dashboard({ userRole }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h2 className="text-2xl font-bold mb-4">Welcome, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}!</h2>

                {userRole === 'admin' && (
                    <div className="mb-4 p-4 border rounded-xl">
                        <h3 className="text-xl font-semibold">Admin Specific Content</h3>
                        <p>This content is only visible to administrators. Here you can manage all aspects of the application.</p>
                        {/* Admin specific components */}
                    </div>
                )}

                {userRole === 'host' && (
                    <div className="mb-4 p-4 border rounded-xl">
                        <h3 className="text-xl font-semibold">Host Specific Content</h3>
                        <p>This content is only visible to hosts. Here you can manage your properties.</p>
                        {/* Host specific components */}
                    </div>
                )}

                {userRole === 'customer' && (
                    <div className="mb-4 p-4 border rounded-xl">
                        <h3 className="text-xl font-semibold">Customer Specific Content</h3>
                        <p>This content is only visible to customers. Here you can view your bookings.</p>
                        {/* Customer specific components */}
                    </div>
                )}

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}