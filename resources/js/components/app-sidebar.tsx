import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react'; // Added usePage
import { BookOpen, Folder, LayoutGrid, Home, Building, MapPin, Sparkles, CalendarCheck, CreditCard, Image, MessageSquare, Users, Github, BookText, Pin } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as { auth: { userRole: string } };
    const userRole = auth.userRole;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        ...(userRole === 'admin' ? [
            {
                title: 'Properties',
                href: '/admin/properties',
                icon: Building,
            },
            {
                title: 'Locations',
                href: '/admin/locations',
                icon: MapPin,
            },
            {
                title: 'Addresses',
                href: '/admin/addresses',
                icon: Pin,
            },
            {
                title: 'Amenities',
                href: '/admin/amenities',
                icon: Sparkles,
            },
            {
                title: 'Bookings',
                href: '/admin/bookings',
                icon: CalendarCheck,
            },
            {
                title: 'Payments',
                href: '/admin/payments',
                icon: CreditCard,
            },
            {
                title: 'Property Images',
                href: '/admin/property-images',
                icon: Image,
            },
            {
                title: 'Reviews',
                href: '/admin/reviews',
                icon: MessageSquare,
            },
            {
                title: 'Users',
                href: '/admin/users',
                icon: Users,
            },
            {
                title: 'Coupons',
                href: '/admin/coupons',
                icon: CreditCard,
            },
        ] : []),
        ...(userRole === 'host' ? [
            {
                title: 'My Properties',
                href: '/host/properties',
                icon: Building,
            },
            {
                title: 'My Bookings',
                href: '/host/bookings',
                icon: CalendarCheck,
            },
            {
                title: 'My Amenities',
                href: '/host/amenities',
                icon: Sparkles,
            },
            {
                title: 'My Addresses',
                href: '/host/addresses',
                icon: Pin,
            },
            {
                title: 'My Payments',
                href: '/host/payments',
                icon: CreditCard,
            },
            {
                title: 'My Coupons',
                href: '/host/coupons',
                icon: CreditCard,
            },
        ] : []),
        ...(userRole === 'customer' ? [
            {
                title: 'My Bookings',
                href: '/customer/bookings',
                icon: CalendarCheck,
            },
            {
                title: 'My Payments',
                href: '/customer/payments',
                icon: CreditCard,
            },
            {
                title: 'My Reviews',
                href: '/customer/reviews',
                icon: MessageSquare,
            },
        ] : []),
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Github,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookText,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
