import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, ShoppingCart, Search, Plane, Car, Building, Ticket, MapPin, DollarSign, Globe, UserCircle, ListPlus } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

export function StorefrontHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="bg-primary text-white shadow-lg">
            <div className="w-7xl mx-auto">
            {/* Top Row: Logo and User Actions */}
            <div className="flex items-center justify-between w-full px-4 lg:px-8 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <AppLogo className="hidden h-10 w-auto text-white sm:block" />
                    <AppLogoIcon className="block h-10 w-auto text-white sm:hidden" />
                </Link>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-white hover:bg-secondary">
                        <DollarSign className="h-5 w-5 mr-1" /> USD
                    </Button>
                    <Button variant="ghost" className="text-white hover:bg-secondary">
                        <Globe className="h-5 w-5 mr-1" /> EN
                    </Button>
                    <Button variant="outline" className="bg-white text-primary hover:bg-primary-light">
                        List your property
                    </Button>

                    {auth.user ? (
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-white hover:bg-secondary">
                                <UserCircle className="h-5 w-5 mr-1" /> Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button variant="ghost" className="text-white hover:bg-secondary">Register</Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="ghost" className="text-white hover:bg-secondary">Sign in</Button>
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-secondary">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64 bg-primary text-white">
                                <nav className="flex flex-col space-y-4 pt-8">
                                    <Link href="/stays" className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Building className="h-5 w-5" />
                                        <span>Stays</span>
                                    </Link>
                                    <Link href="/flights" className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Plane className="h-5 w-5" />
                                        <span>Flights</span>
                                    </Link>
                                    <Link href="/car-rentals" className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Car className="h-5 w-5" />
                                        <span>Car rentals</span>
                                    </Link>
                                    <Link href="/attractions" className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Ticket className="h-5 w-5" />
                                        <span>Attractions</span>
                                    </Link>
                                    <Link href="/airport-taxis" className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <MapPin className="h-5 w-5" />
                                        <span>Airport taxis</span>
                                    </Link>
                                    <div className="h-px bg-secondary my-2" /> {/* Separator */}
                                    <Button variant="ghost" className="text-white hover:bg-secondary justify-start">
                                        <DollarSign className="h-5 w-5 mr-2" /> USD
                                    </Button>
                                    <Button variant="ghost" className="text-white hover:bg-secondary justify-start">
                                        <Globe className="h-5 w-5 mr-2" /> EN
                                    </Button>
                                    <Button variant="outline" className="bg-white text-primary hover:bg-primary-light w-full">
                                        List your property
                                    </Button>
                                    {auth.user ? (
                                        <Link href="/dashboard">
                                            <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">
                                                <UserCircle className="h-5 w-5 mr-2" /> Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/register">
                                                <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">Register</Button>
                                            </Link>
                                            <Link href="/login">
                                                <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">Sign in</Button>
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Desktop Navigation Links and Search Bar */}
            <div className="bg-primary py-3 px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full">
                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex space-x-6">
                    <Link href="/stays" className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Building className="h-5 w-5" />
                        <span>Stays</span>
                    </Link>
                    <Link href="/flights" className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Plane className="h-5 w-5" />
                        <span>Flights</span>
                    </Link>
                    <Link href="/car-rentals" className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Car className="h-5 w-5" />
                        <span>Car rentals</span>
                    </Link>
                    <Link href="/attractions" className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Ticket className="h-5 w-5" />
                        <span>Attractions</span>
                    </Link>
                    <Link href="/airport-taxis" className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <MapPin className="h-5 w-5" />
                        <span>Airport taxis</span>
                    </Link>
                </nav>

                {/* Search Bar */}
                <div className="relative flex-grow w-full lg:w-auto lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-light" />
                    <Input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary-dark text-white focus:ring-primary-light focus:border-primary-light"
                    />
                </div>
                <Button className="bg-secondary-dark hover:bg-secondary-darker text-white font-bold py-2 px-6 rounded-md w-full lg:w-auto mt-4 lg:mt-0">
                    Search
                </Button>
            </div>
            </div>
        </header>
    );
}
