
import AppLogo from './app-logo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

export function StorefrontFooter() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <AppLogo />
                        <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
                            Dream Dwell is a platform for finding and booking your next dream vacation rental.
                        </p>
                        <ul className="mt-8 flex gap-6">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <Facebook className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <Instagram className="h-6 w-6" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <Twitter className="h-6 w-6" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Services</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href={route('services')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('booking')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Booking
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('rental-management')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Rental Management
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('host-support')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Host Support
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">About</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href={route('about-us')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('careers')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('press')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href={route('helpful-links')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Helpful Links
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('contact-us')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('faqs')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('terms-and-conditions')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Legal</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href={route('legal')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Legal
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('privacy-policy')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('cookie-policy')} className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Dream Dwell. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
