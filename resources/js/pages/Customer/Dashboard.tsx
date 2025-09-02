import { Head, usePage, Link } from '@inertiajs/react';
import StorefrontLayout from '@/layouts/StorefrontLayout';
import { type SharedData, type Booking, type Payment } from '@/types';

interface CustomerDashboardProps extends SharedData {
    bookings: {
        data: Booking[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const CustomerDashboard: React.FC = () => {
    const { auth, bookings } = usePage<CustomerDashboardProps>().props;
    return (
        <StorefrontLayout>
            <Head title="Customer Dashboard" />
            <section className="py-16 px-4 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    <div className="w-full text-gray-800 p-8">
                        <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard <span className='text-primary'>{auth.user.name}</span></h1>
                        <p className="text-lg mb-4">Here you can manage your account, view orders, and update your information.</p>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
                            {bookings.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {bookings.data.map((booking) => (
                                                <Link as="tr" href={route('customer.bookings.show', booking.id)} key={booking.id} className="cursor-pointer hover:bg-gray-50">
                                                    <td className="py-4 px-6 whitespace-nowrap">{booking.property?.title || 'N/A'}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap">{booking.check_in_date}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap">{booking.check_out_date}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap">${parseFloat(booking.total_price).toFixed(2)}</td>
                                                    <td className="py-4 px-6 whitespace-nowrap">
                                                        {booking.payments && booking.payments.length > 0 ? (
                                                            booking.payments[0].status
                                                        ) : (
                                                            'N/A'
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6 whitespace-nowrap">{booking.status}</td>
                                                </Link>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">You have no bookings yet.</p>
                            )}

                            {/* Pagination Links */}
                            {bookings.links.length > 3 && (
                                <div className="flex justify-center mt-4">
                                    {bookings.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 mx-1 rounded-md ${link.active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </StorefrontLayout >
    );
};

export default CustomerDashboard;
