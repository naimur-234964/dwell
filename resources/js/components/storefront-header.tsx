import { Link, usePage, router } from '@inertiajs/react'; // Added router
import { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, ShoppingCart, Search, Plane, Car, Building, Ticket, MapPin, DollarSign, Globe, UserCircle, ListPlus } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'; // Added Dropdown components

export function StorefrontHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="bg-primary text-white shadow-lg">
            <div className="w-full lg:max-w-7xl lg:mx-auto">
            {/* Top Row: Logo and User Actions */}
            <div className="flex items-center justify-between w-full px-4 lg:px-8 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <AppLogo className="hidden h-10 w-auto text-white sm:block" />
                    {/* <AppLogoIcon className="block h-10 w-auto text-white sm:hidden" /> */}
                </Link>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-white hover:bg-secondary">
                        <DollarSign className="h-4 w-4 mr-1" /> USD
                    </Button>
                    <Button variant="ghost" className="text-white hover:bg-secondary">
                        <Globe className="h-4 w-4 mr-1" /> EN
                    </Button>
                    <div className="hidden lg:block">
                        <Button variant="outline" className="bg-white text-primary hover:bg-primary-light">
                            List your property
                        </Button>
                    </div>

                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-white hover:bg-secondary">
                                    <UserCircle className="h-5 w-5 mr-1" /> {auth.user.name}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem asChild>
                                    <Link href={route('dashboard')}>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')}>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden sm:flex space-x-4">
                            <Link href={route('register')}>
                                <Button variant="ghost" className="text-primary bg-white hover:bg-secondary hover:text-white">Register</Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="ghost" className="text-primary bg-white hover:bg-secondary hover:text-white">Sign in</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-secondary">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs bg-primary text-white flex flex-col pt-10">
                                <div className="p-4 mt-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-light" />
                                        <Input
                                            type="text"
                                            placeholder="Where are you going?"
                                            className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary-dark text-white placeholder-primary-light focus:ring-primary-light focus:border-primary-light"
                                        />
                                    </div>
                                </div>
                                <nav className="flex flex-col space-y-4 p-4 flex-grow overflow-y-auto">
                                    <Link href={route('home')} className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Building className="h-5 w-5" />
                                        <span>Stays</span>
                                    </Link>
                                    <Link href={route('flights')} className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Plane className="h-5 w-5" />
                                        <span>Flights</span>
                                    </Link>
                                    <Link href={route('car-rentals')} className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Car className="h-5 w-5" />
                                        <span>Car rentals</span>
                                    </Link>
                                    <Link href={route('attractions')} className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
                                        <Ticket className="h-5 w-5" />
                                        <span>Attractions</span>
                                    </Link>
                                    <Link href={route('airport-taxis')} className="flex items-center space-x-2 hover:text-primary-light transition-colors duration-300">
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
                                    <Button variant="outline" className="bg-white text-primary hover:bg-primary-light w-full justify-start">
                                        List your property
                                    </Button>
                                    {auth.user ? (
                                        <>
                                            <Link href={route('dashboard')}>
                                                <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">
                                                    <UserCircle className="h-5 w-5 mr-2" /> Dashboard
                                                </Button>
                                            </Link>
                                            <Link href={route('profile.edit')}>
                                                <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">
                                                    <UserCircle className="h-5 w-5 mr-2" /> Profile
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start" onClick={() => router.post(route('logout'))}>
                                                <UserCircle className="h-5 w-5 mr-2" /> Log Out
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={route('register')}>
                                                <Button variant="ghost" className="text-white hover:bg-secondary w-full justify-start">Register</Button>
                                            </Link>
                                            <Link href={route('login')}>
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
            <div className="bg-primary py-3 px-4 lg:px-8 flex flex-row items-center justify-between w-full space-x-2">
                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex space-x-6">
                    <Link href={route('home')} className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Building className="h-5 w-5" />
                        <span>Stays</span>
                    </Link>
                    <Link href={route('flights')} className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Plane className="h-5 w-5" />
                        <span>Flights</span>
                    </Link>
                    <Link href={route('car-rentals')} className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Car className="h-5 w-5" />
                        <span>Car rentals</span>
                    </Link>
                    <Link href={route('attractions')} className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <Ticket className="h-5 w-5" />
                        <span>Attractions</span>
                    </Link>
                    <Link href={route('airport-taxis')} className="flex items-center space-x-2 text-white hover:text-primary-light transition-colors duration-300">
                        <MapPin className="h-5 w-5" />
                        <span>Airport taxis</span>
                    </Link>
                </nav>

                {/* Search Bar */}
                <div className="relative flex-grow w-3/4 lg:w-auto lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-light" />
                    <Input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full pl-10 pr-4 py-2 rounded-md bg-secondary-dark text-white focus:ring-primary-light focus:border-primary-light"
                    />
                </div>
                <Button className="bg-white hover:bg-secondary hover:text-white text-primary font-bold py-2 px-6 rounded-md w-1/4 lg:w-auto">
                    Search
                </Button>
            </div>
            </div>
        </header>
    );
}
